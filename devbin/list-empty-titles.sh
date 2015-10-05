#!/usr/bin/env bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
echo "Prepublish… Starting transpile."
cd $DIR/..

cat data/index.idx | grep --invert -n "<::sif::>"

