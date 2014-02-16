#!/usr/bin/make -f

PROJECT_NAME    := traktor-harmonik
PROJECT_VERSION := $(shell head -n 1 project.clj | awk '{print $$3}' | tr -d '"')

LEIN := lein
SASS := sass

CLJ_SRC_DIR        := src/clj
CLJS_SRC_DIR       := src/cljs
SASS_SRC_DIR       := src/sass
RESOURCES_DIR      := src/resources
APP_RESOURCES_DIR  := src/app
CLJS_BUILD_DIR     := target/classes/public/js
SASS_BUILD_DIR     := target/classes/public/css
NATIVE_DIR         := target/native/macosx/x86_64
APP                := target/$(PROJECT_NAME).app
DMG                := target/$(PROJECT_NAME)-$(PROJECT_VERSION).dmg
UBERJAR            := target/$(PROJECT_NAME)-$(PROJECT_VERSION)-standalone.jar
DYLIBS             := $(addprefix $(NATIVE_DIR)/,libtraktor.dylib libffi.dylib)
CLJ_SOURCES        := $(shell find $(CLJ_SRC_DIR) -name '*.clj')
CLJS_SOURCES       := $(shell find $(CLJS_SRC_DIR) -name '*.cljs')
SASS_SOURCES       := $(shell find $(SASS_SRC_DIR) -name '*.scss')
SASS_RESULTS       := $(patsubst $(SASS_SRC_DIR)/%.scss,$(SASS_BUILD_DIR)/%.css,$(SASS_SOURCES))
RESOURCES          := $(shell find $(RESOURCES_DIR) -type f)
APP_RESOURCES      := $(shell find $(APP_RESOURCES_DIR) -type f \( ! -name ".DS_Store" \))
UBERJAR_COPY       := $(APP)/Contents/Resources/$(shell basename $(UBERJAR))
DYLIBS_COPY        := $(patsubst $(NATIVE_DIR)/%,$(APP)/Contents/MacOS/%,$(DYLIBS))
APP_RESOURCES_COPY := $(patsubst $(APP_RESOURCES_DIR)/%,$(APP)/%,$(APP_RESOURCES))

all : dmg

js : $(CLJS_BUILD_DIR)/app.js

css : $(SASS_RESULTS)

uberjar : $(UBERJAR)

app : $(APP)

dmg : $(DMG)

clean :
	rm -rf target

$(CLJS_BUILD_DIR)/app.js : $(CLJS_SOURCES)
	mkdir -p $(dir $@)
	-$(LEIN) cljsbuild once

$(SASS_BUILD_DIR)/%.css : $(SASS_SRC_DIR)/%.scss
	mkdir -p $(dir $@)
	$(SASS) $<:$@

$(DYLIBS) :
	$(LEIN) classpath

$(UBERJAR) : $(CLJ_SOURCES) $(RESOURCES) $(CLJS_BUILD_DIR)/app.js $(SASS_RESULTS)
	$(LEIN) uberjar

$(DYLIBS_COPY) : $(APP)/Contents/MacOS/% : $(NATIVE_DIR)/%
	mkdir -p $(dir $@)
	cp $< $@

$(UBERJAR_COPY) : $(UBERJAR)
	mkdir -p $(dir $@)
	cp $< $@

$(APP_RESOURCES_COPY) : $(APP)/% : $(APP_RESOURCES_DIR)/%
	mkdir -p $(dir $@)
	cp $< $@

$(APP) : $(APP_RESOURCES_COPY) $(UBERJAR_COPY) $(DYLIBS_COPY)

$(DMG) : $(APP_RESOURCES_COPY) $(UBERJAR_COPY) $(DYLIBS_COPY)
	rm -f $@
	hdiutil create -ov -srcfolder $(APP) $@
	hdiutil internet-enable -yes $@
