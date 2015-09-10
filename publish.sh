#!/usr/bin/env bash

cp -r lib release
cp -r data release
cp -r bin release

find release -name "*.es6" -delete
