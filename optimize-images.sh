#!/bin/bash

# Optimize Images Script for Sky Simulator
# Uses ImageMagick to compress images with high quality (90%) and metadata stripping.

# Ensure ImageMagick is installed
if ! command -v magick &> /dev/null; then
    echo "Error: ImageMagick (magick) is not installed. Please install it using 'brew install imagemagick'."
    exit 1
fi

echo "Starting image optimization..."

# Find and optimize PNG, JPG, and WebP images
# -strip: removes metadata
# -quality 90: High quality compression (visually lossless)
# -resize 50%: (Optional) Remove this if you don't want to shrink dimensions
find src -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.webp" \) -exec magick mogrify -strip -quality 90 {} +

echo "Optimization complete! All images in 'src' have been optimized."
