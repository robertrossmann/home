# Defining shell is necessary in order to modify PATH
SHELL := sh
# Allow make to recognise binaries provided via npm without using full path into node_modules
export PATH := node_modules/.bin/:$(PATH)

# Modify these variables in local.mk to add flags to the commands, ie.
# FINSTALL += --prefer-offline
# Now, npm will be invoked with the specified flag and will try to install packages from cache if
# they are available.
FINSTALL :=
FCOMPILE :=
FLINT :=
FTEST :=

# Build a list of our targets which should be "made" by make when compiling sources
JSFILES := $(patsubst %.mjs, %.js, $(shell util/make/files mjs))

# Since this is the first target, Make will do this when make is invoked without arguments
all: precompile


# TASK DEFINITIONS

install: node_modules

precompile: install
	babel . --extensions .mjs --out-dir . $(FCOMPILE)

compile: $(JSFILES)

lint:
	eslint --ext .mjs --report-unused-disable-directives $(FLINT) .

test: force compile
	mocha $(FTEST)

inspect: force compile
	mocha --inspect --inspect-brk $(FTEST)

coverage: coverage/lcov.info

clean:
	rm -rf .nyc_output coverage

# Delete all compiled files
distclean: clean
	rm $(shell ./util/make/files js) || true


# GENERIC TARGETS

node_modules: package.json
	npm install $(FINSTALL) && touch node_modules

# Default compilation target for all source files
%.js: %.mjs node_modules babel.config.js
	babel $< --out-file $@ $(FCOMPILE)

coverage/lcov.info: $(JSFILES)
	nyc mocha $(FTEST)

# Use this prerequisite to force the target to never be treated as "up to date"
.PHONY: force

# If this file exists, load it and add it to this makefile.
# Useful for defining per-developer variables. This file should not be under version control. ⚠️
-include local.mk
