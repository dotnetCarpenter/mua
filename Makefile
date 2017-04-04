# http://stackoverflow.com/questions/3302546/gnu-make-copy-many-files-to-a-single-location
# https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html#Automatic-Variables

libs = $(wildcard bower_components/svg.js/dist/*.js) $(wildcard bower_components/svg.draw.js/dist/*.js)
files = $(notdir ${libs})
libdirs = $(dir ${libs})
targets = $(addprefix js/lib/, ${files})

all: ${targets}

js/lib/%.js: %.js
	cp -fv $? $@

vpath %.js $(libdirs)
