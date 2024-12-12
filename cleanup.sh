#!/bin/bash

# Define the parent directory
PARENT_DIR="networkFiles"

# Check if the parent directory exists
if [ ! -d "$PARENT_DIR" ]; then
    echo "Error: Directory '$PARENT_DIR' does not exist."
    exit 1
fi

# Iterate over each subdirectory in the parent directory
for dir in "$PARENT_DIR"/*/; do
    # Ensure it's a directory
    if [ -d "$dir" ]; then
        echo "Processing directory: $dir"

        # Delete 'caches' folder if it exists
        if [ -d "${dir}caches" ]; then
            rm -rf "${dir}caches"
            echo "Deleted folder: ${dir}caches"
        else
            echo "Folder not found: ${dir}caches"
        fi

        # Delete 'database' folder if it exists
        if [ -d "${dir}database" ]; then
            rm -rf "${dir}database"
            echo "Deleted folder: ${dir}database"
        else
            echo "Folder not found: ${dir}database"
        fi

        # Delete 'DATABASE_METADATA.json' file if it exists
        if [ -f "${dir}DATABASE_METADATA.json" ]; then
            rm -f "${dir}DATABASE_METADATA.json"
            echo "Deleted file: ${dir}DATABASE_METADATA.json"
        else
            echo "File not found: ${dir}DATABASE_METADATA.json"
        fi

        echo "----------------------------------------"
    fi
done

echo "Cleanup completed."
