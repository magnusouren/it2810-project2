import csv
import json

# Åpne CSV-filen for lesing
with open('movies_metadata.csv', mode='r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)

    # Initialiser en liste for å lagre filmdataene
    film_data = []

    # Gå gjennom hver rad i CSV-filen
    for row in csv_reader:
        try:
            # Håndterer spesielle verdier som kan være strenger eller JSON
            belongs_to_collection = row["belongs_to_collection"]
            if belongs_to_collection:
                belongs_to_collection = json.loads(
                    belongs_to_collection.replace("'", "\""))

            genres = json.loads(row["genres"].replace("'", "\""))

            production_companies = row["production_companies"]
            if production_companies:
                production_companies = json.loads(
                    production_companies.replace("'", "\""))

            production_countries = row["production_countries"]
            if production_countries:
                production_countries = json.loads(
                    production_countries.replace("'", "\""))

            spoken_languages = row["spoken_languages"]
            if spoken_languages:
                spoken_languages = json.loads(
                    spoken_languages.replace("'", "\""))

            # Legg til filmdata i listen
            film_data.append({
                "adult": row["adult"] == "True",
                "belongs_to_collection": belongs_to_collection,
                "budget": int(row["budget"]),
                "genres": genres,
                "homepage": row["homepage"],
                "id": int(row["id"]),
                "imdb_id": row["imdb_id"],
                "original_language": row["original_language"],
                "original_title": row["original_title"],
                "overview": row["overview"],
                "popularity": float(row["popularity"]),
                "poster_path": row["poster_path"],
                "production_companies": production_companies,
                "production_countries": production_countries,
                "release_date": row["release_date"],
                "revenue": int(row["revenue"]),
                "runtime": float(row["runtime"]),
                "spoken_languages": spoken_languages,
                "status": row["status"],
                "tagline": row["tagline"],
                "title": row["title"],
                "video": row["video"] == "True",
                "vote_average": float(row["vote_average"]),
                "vote_count": int(row["vote_count"])
            })
        except:
            print("Kunne ikke lese filmdata.")

# Lagre dataene som JSON-fil
with open('moviesMetadata.json', 'w', encoding='utf-8') as json_file:
    json.dump(film_data, json_file, ensure_ascii=False, indent=4)

print("JSON-filen er opprettet.")
