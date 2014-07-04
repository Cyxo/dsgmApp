SOURCEDIR := source
CLASSDIR := build

JAVAFILES := $(wildcard $(SOURCEDIR)/*.java)
CLASSFILES := $(JAVAFILES:.java=.class)
CLASSFILES := $(CLASSFILES:$(SOURCEDIR)%=$(CLASSDIR)%)

.PHONY: run
run: DSGameMaker.jar
	@java -jar $<

DSGameMaker.jar: $(CLASSFILES)
	javac $(SOURCEDIR)/*.java -d $(CLASSDIR)
	javafxpackager -createjar -appclass DSGameMaker -srcdir "$(CLASSDIR)" -outfile DSGameMaker -v

$(CLASSDIR)/%.class: $(SOURCEDIR)/%.java $(CLASSDIR)
	@# Compiling files individually means they can't access each other
	@#javac $< -d $(CLASSDIR)

$(CLASSDIR):
	@mkdir $@

.PHONY: clean
clean:
	@rm -f DSGameMaker.jar
	@rm -f $(CLASSDIR)/*.class
	@rm -f $(CLASSDIR)/DSGameMakerPackage/*.class
	@rmdir $(CLASSDIR)/DSGameMakerPackage
	@rmdir $(CLASSDIR)