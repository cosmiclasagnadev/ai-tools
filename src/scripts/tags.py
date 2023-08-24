import openai
import csv

# Set your OpenAI API key here
openai.api_key = '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'

def generate_tags(description):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=description,
        max_tokens=50,
        stop=None,
        temperature=0.7
    )
    tags = response.choices[0].text.strip().lower().replace(" ", "-").split(",")
    tags = [tag.strip(' "[]\n') for tag in tags]
    return tags

def process_csv(input_file, output_file):
    with open(input_file, 'r') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)  # Skip the header row

        with open(output_file, 'w', newline='') as csvout:
            writer = csv.writer(csvout)
            writer.writerow(['Description', 'Tags'])  # Write the header

            for row in reader:
                description = row[0]
                tags = generate_tags(description)
                tags_str = ', '.join([f'"{tag}"' for tag in tags])
                writer.writerow([description, f'[{tags_str}]'])
                print(f"Processed: {description}")

    print("CSV processing complete!")

if __name__ == "__main__":
    input_csv_file = "input.csv"  # Replace with your input CSV file
    output_csv_file = "output.csv"  # Replace with your output CSV file
    process_csv(input_csv_file, output_csv_file)
