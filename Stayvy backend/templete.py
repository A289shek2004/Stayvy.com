import os
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format='[%(asctime)s]: %(message)s')

project_name = "airbnb-backend"

list_of_files = [
    f"{project_name}/src/app.js",
    f"{project_name}/src/server.js",
    f"{project_name}/src/config/prismaClient.js",
    f"{project_name}/src/controllers/__init__.py",       # placeholder so folder gets created
    f"{project_name}/src/routes/__init__.py",            # placeholder
    f"{project_name}/src/middlewares/errorHandler.js",
    f"{project_name}/prisma/schema.prisma",
    f"{project_name}/prisma/seed.js",
    f"{project_name}/.env",
    f"{project_name}/package.json",
    f"{project_name}/README.md"
]

for filepath in list_of_files:
    file_path = Path(filepath)
    filedir, filename = os.path.split(file_path)

    if filedir != "":
        os.makedirs(filedir, exist_ok=True)
        logging.info(f"Creating directory: {filedir} for the file: {filename}")

    if not os.path.exists(filepath) or os.path.getsize(filepath) == 0:
        with open(filepath, "w") as f:
            pass
        logging.info(f"Creating empty file: {filepath}")
    else:
        logging.info(f"File already exists: {filepath}")
