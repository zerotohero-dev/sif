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

PD=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

cd $PD/..

FILENAME=$( basename "$1" )
EXTENSION="${FILENAME##*.}"
FILENAME="${FILENAME%.*}"
DIR=$( dirname "$1" )

babel --source-maps --out-file "$DIR/$FILENAME.js" $1
