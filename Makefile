SOURCEDIR := source
CLASSDIR := build

JAVAFILES := $(wildcard $(SOURCEDIR)/*.java)
CLASSFILES := $(JAVAFILES:.java=.class)
CLASSFILES := $(CLASSFILES:$(SOURCEDIR)%=$(CLASSDIR)%)

.PHONY: run
run: dsgmBox.jar
	@java -jar $<

dsgmBox.jar: $(CLASSFILES)
	javac $(SOURCEDIR)/*.java -d $(CLASSDIR)
	javafxpackager -createjar -appclass dsgmBox -srcdir "$(CLASSDIR)" -outfile dsgmBox -v

$(CLASSDIR)/%.class: $(SOURCEDIR)/%.java $(CLASSDIR)
	@# Compiling files individually means they can't access each other
	@#javac $< -d $(CLASSDIR)

$(CLASSDIR):
	@mkdir $@

.PHONY: clean
clean:
	@rm -f dsgmBox.jar
	@rm -f $(CLASSDIR)/*.class
	@rm -f $(CLASSDIR)/dsgmBoxPackage/*.class
	@rmdir $(CLASSDIR)/dsgmBoxPackage
	@rmdir $(CLASSDIR)