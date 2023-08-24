import pandas as pd
from bs4 import BeautifulSoup
import requests
import logging

# Configure logging
logging.basicConfig(format='%(asctime)s - %(levelname)s - %(message)s', level=logging.INFO)

# Suppress SSL certificate verification warnings
requests.packages.urllib3.disable_warnings()

# Read the CSV file containing links
input_csv = "input_links.csv"
output_csv = "output_data.csv"

data = pd.read_csv(input_csv)

# Initialize lists to store data
titles = []
# descriptions = []
# featured_images = []
# tags_list = []
# urls = []
# free_or_paid = []

# Iterate through each link
for idx, link in enumerate(data['link']):
    logging.info(f"Processing link {idx + 1}/{len(data)}: {link}")

    response = requests.get(link, verify=False)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Get site title
    og_title = soup.find('meta', attrs={'property': 'og:title'})
    title = og_title['content'] if og_title and 'content' in og_title.attrs else ''

    if not title:
        title_tag = soup.find('title')
        title = title_tag.get_text() if title_tag else ''

    titles.append(title)

    # Get meta description
    # meta_description = soup.find('meta', attrs={'name': 'description'})
    # description = meta_description['content'] if meta_description else ''
    # descriptions.append(description)

    # # Get Open Graph image link
    # og_image = soup.find('meta', attrs={'property': 'og:image'})
    # featured_image = og_image['content'] if og_image else ''
    # featured_images.append(featured_image)

    # Generate tags
    # Here you should replace this with your actual logic for generating tags
    # tags = ["ai-app", "machine-learning"]  # Replace with your tag generation logic
    # tags_list.append(tags)

    # Check if "Pricing" exists in header
    # header_text = soup.find('header').get_text() if soup.find('header') else ''
    # free_or_paid.append("free-plan" if "Pricing" in header_text else "free")

    # urls.append(link)

# Create a DataFrame
output_data = pd.DataFrame({
    'title': titles,
    # 'description': descriptions,
    # 'featured_image': featured_images,
    # 'tags': tags_list,
    # 'url': urls,
    # 'freeOrPaid': free_or_paid
})

# Save the DataFrame to a CSV file
output_data.to_csv(output_csv, index=False)
