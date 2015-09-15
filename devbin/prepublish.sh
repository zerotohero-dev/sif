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

cd $DIR/..

./devbin/transpile.sh

cp -r lib release
cp -r data release
cp -r bin release

find release -name "*.es6" -delete
find release -name "*.js.map" -delete
find release -name "__tmp*" -delete

