import requests
from bs4 import BeautifulSoup
import csv

# URL of the website you want to scrape
url = 'https://www.synthesia.io/post/ai-tools'

# Send a GET request to the URL
response = requests.get(url)
response.raise_for_status()

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Find all external links within the <article> tag
external_links = []
article_tag = soup.find('article')

if article_tag:
    for link in article_tag.find_all('a', href=True):
        href = link['href']
        # Check if the link is external (not relative)
        if href.startswith('http') and not href.startswith(url):
            external_links.append(href)

# Extract meta titles, descriptions, and open graph images
link_data = []
for link in external_links:
    link_response = requests.get(link)
    link_soup = BeautifulSoup(link_response.content, 'html.parser')

    meta_title = link_soup.find('meta', {'property': 'og:title'})['content'] if link_soup.find('meta', {'property': 'og:title'}) else ''
    meta_description = link_soup.find('meta', {'property': 'og:description'})['content'] if link_soup.find('meta', {'property': 'og:description'}) else ''
    og_image = link_soup.find('meta', {'property': 'og:image'})['content'] if link_soup.find('meta', {'property': 'og:image'}) else ''

    link_data.append([link, meta_title, meta_description, og_image])

# Specify the output file path (change as needed)
output_file = 'external_links.csv'

# Write the links and additional data to a CSV file
with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
    csv_writer = csv.writer(csvfile)
    csv_writer.writerow(['Link', 'Meta Title', 'Meta Description', 'Open Graph Image'])
    csv_writer.writerows(link_data)

print(f"{len(link_data)} external links and data found and saved to {output_file}")
