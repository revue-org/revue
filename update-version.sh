NEW_VERSION=$1
# Update the version in the build.gradle.kts file
sed -i '' "s/version = .*/version = \"$NEW_VERSION\"/" build.gradle.kts

# Find all package.json files and update the version (-maxdepth because there are some nested package.json files
find . -maxdepth 2 -name "package.json" -exec sed -i '' 's/"version": .*/"version": "'"$NEW_VERSION"'",/' {} \;
