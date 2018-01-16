#!/usr/bin/env bash
cwd=$(pwd)

function test_npm()
{
  cd ${cwd}
  npm test
}

test_npm
