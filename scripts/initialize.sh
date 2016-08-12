#!/bin/bash

echo "installing node_modules";
cnpm install;
echo "node_modules installed";

cd node_modules/generator-chameleon;
echo "entered node_modules/generator-chameleon";
echo "installing node_modules/generator-chameleon/node_modules";
cnpm install;
echo "node_modules/generator-chameleon/node_modules installed";

cd ../..;

echo "enterd project home";
echo "installing chameleon features";
yocommand="yo chameleon";
for arg in $@
do
  yocommand="${yocommand} ${arg}";
done
echo "executing... $yocommand";
eval $yocommand;

rm -rf .git;
git init;
#git remote add origin https://git.oschina.net/huibaotech/foo.git
