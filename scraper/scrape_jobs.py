import requests
from bs4 import BeautifulSoup
import json
import os
from pymongo import MongoClient

client = MongoClient(os.environ.get("MONGO_URI"))
db = client['jobdb']
collection = db['jobs']
collection.delete_many({})  # Clear old jobs

def scrape():
    for page in range(1, 5):  # Adjust page range accordingly
        url = f"https://www.naukri.com/software-developer-jobs-{page}"
        headers = {"User-Agent": "Mozilla/5.0"}
        res = requests.get(url, headers=headers)
        soup = BeautifulSoup(res.text, "html.parser")

        jobs = soup.find_all("article", class_="jobTuple")
        for job in jobs:
            title = job.find("a", class_="title").text.strip()
            company = job.find("a", class_="subTitle").text.strip()
            location = job.find("li", class_="location").text.strip()
            link = job.find("a", class_="title")['href']
            posted = job.find("span", class_="type").text.strip()
            collection.insert_one({
                "title": title,
                "company": company,
                "location": location,
                "link": link,
                "posted": posted,
            })

if __name__ == "__main__":
    scrape()
