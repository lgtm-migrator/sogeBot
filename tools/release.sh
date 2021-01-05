currentSnapshot=$(node tools/changelog.js nextSnapshot)
nextTag=$(node tools/changelog.js nextTag)
file=./package.json

echo Updating package.json version from $currentSnapshot to $nextTag
sed -i "s/$currentSnapshot/$nextTag/g" "$file"
git add $file
git commit -m "build: $nextTag"
echo Pushing build commit $nextTag
git push origin master

echo Creating tag $nextTag
git tag $nextTag
echo Pushing to github and triggering release
git push origin --tags
echo Released $nextTag

nextSnapshot=$(node tools/changelog.js nextSnapshot)
echo Updating package.json version from with $nextTag to $nextSnapshot
sed -i "s/$nextTag/$nextSnapshot/g" "$file"
git add $file
git commit -m "build: $nextSnapshot"
echo Pushing snapshot commit $nextSnapshot
git push origin master

echo Done!