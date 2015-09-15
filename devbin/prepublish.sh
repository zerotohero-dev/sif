#!/usr/bin/env bash

#    _,                            ,--.   ,---.
#   /(_                     ,---.  `--'  /  .-'
#  |   '-._        . ' .   (  .-'  ,--.  |  `-,
#  \    ,-.)      -= * =- .-'  `)  |  |  |  .-'
#   \((` .(        '/. '  `----'   `--'  `--'
#    )\  _/        /         just like magic
# .-'   '--.      /
# \,         \   /|
#  ';,_) _)'\ \,//    This program is distributed
#   `\   (   '._/   under the terms of the MIT license.
#    |  . '.
#    |      \   Please see the `LICENSE.md` file for details.
#    |  \|   |
#     \  |  /    Send your comments and suggestions to…
#      '.| /      <https://github.com/v0lkan/sif/issues>.
#

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
echo "Prepublish… Starting transpile."
cd $DIR/..

./devbin/batch-transpile.sh

echo "Transpilation done. Starting copying files…"

cp -r bin release
cp -r data release
cp -r lib release

echo "Finished copying files. Starting cleanup."

find release -name "*.es6" -delete
find release -name "*.js.map" -delete
find release -name "__tmp*" -delete

echo "Finished cleanup. All done!"

