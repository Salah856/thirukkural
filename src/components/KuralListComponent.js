import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Button, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { getKurals } from "../actions/fetch-data/fetch-data";
import { gray, green } from "ansi-colors";

class KuralListComponent extends Component {
  componentDidMount() {
    this.props.getKurals();
  }
  renderText(kural) {
    if (this.props.lang === "en") {
      return kural.Translation;
    } else {
      return kural.Line1 + "\n" + kural.Line2;
    }
  }
  render() {
    const kurals = this.props.kurals.map(kural => (
      <View
        style={{ padding: 10, borderWidth: 1, borderColor: "green" }}
        key={kural.Number}
      >
        <Text
          onPress={() => {
            this.props.navigation.navigate("KuralDetail", {
              details: kural,
              lang: this.props.lang,
              title: kural.Number
            });
          }}
        >
          {this.renderText(kural)}
        </Text>
      </View>
    ));
    return <View style={{ flex: 1, padding: 10 }}>{kurals}</View>;
  }
}

const mapStateToProps = state => {
  return {
    kurals: state.details.kurals || [],
    lang: state.details.lang
  };
};
const mapDispatchToProps = dispatch => ({
  getKurals: () => {
    dispatch(getKurals());
  }
});
const KuralListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(KuralListComponent);

export default withNavigation(KuralListContainer);
