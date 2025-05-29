import requests
from bs4 import BeautifulSoup
import json
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
client = MongoClient(os.getenv("MONGO_URI"))
db = client['books']
collection = db['books']
collection.delete_many({})  # Clear old jobs

def scrape_books():
    base_url = "http://books.toscrape.com/catalogue/page-{}.html"
    page = 1

    while True:
        print(f"Scraping page {page}...")
        url = base_url.format(page)
        res = requests.get(url)
        if res.status_code != 200:
            print("No more pages or failed to fetch.")
            break

        soup = BeautifulSoup(res.text, "html.parser")
        books = soup.select("article.product_pod")
        if not books:
            print("No books found on page, stopping.")
            break

        for book in books:
            title = book.h3.a['title']
            price = book.select_one('p.price_color').text.strip()
            availability = book.select_one('p.instock.availability').text.strip()
            rating_class = book.p['class']
            rating = rating_class[1] if len(rating_class) > 1 else "No rating"

            book_data = {
                "title": title,
                "price": price,
                "availability": availability,
                "rating": rating
            }
            collection.insert_one(book_data)
            print(f"Inserted: {price}")

        page += 1

if __name__ == "__main__":
    scrape_books()
    print("Scraping complete.")