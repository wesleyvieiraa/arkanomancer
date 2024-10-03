class SnakerCamelSwitcher {
  camelToSnakeString(camelString) {
    return camelString
      .split(/(?=[A-Z])/)
      .join("_")
      .toLowerCase();
  };
}
module.exports = new SnakerCamelSwitcher();
