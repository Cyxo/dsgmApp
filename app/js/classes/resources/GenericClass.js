function GenericClass() {

  this.show = function() {
    var element = MyApplication.UI.switchMainMarkup("resource");
    var sideElement = $("> aside", element);
    var mainElement = $("> div.ui-panel", element);
    sideElement.empty();
    mainElement.empty();
    this.showGeneric(sideElement, mainElement);
  }

  this.showGeneric = function(sideElement, mainElement) {
    var nameTextBox = new TextBoxClass(this.name, null, "Name");
    nameTextBox.handleImmediately = true;
    var resource = this;
    nameTextBox.setHandler(function(text) {
      var isValid = MyApplication.isValidTerm(text);
      nameTextBox.setError(!isValid);
      if (!isValid) return;
      MyApplication.currentProject.renameResource(resource, text);
    });
    sideElement.append(nameTextBox.getElement());
    if (this.showSpecific) this.showSpecific(sideElement, mainElement);
    nameTextBox.focus();
  }

}