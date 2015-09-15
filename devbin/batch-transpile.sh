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

echo "Starting transpilation…"

PD=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

cd $PD/..

find . -name "*.es6" -type f -exec sh -c './devbin/transpile.sh ${0}' {} \;

echo "Finished transpilation."

