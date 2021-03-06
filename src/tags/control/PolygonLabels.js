import React from "react";
import { observer } from "mobx-react";
import { types } from "mobx-state-tree";

import LabelMixin from "../../mixins/LabelMixin";
import Registry from "../../core/Registry";
import SelectedModelMixin from "../../mixins/SelectedModel";
import Types from "../../core/Types";
import { HtxLabels, LabelsModel } from "./Labels";
import { PolygonModel } from "./Polygon";
import ControlBase from "./Base";

/**
 * PolygonLabels tag, create labeled polygons
 * @example
 * <View>
 *   <Image name="image" value="$image" />
 *   <PolygonLabels name="lables" toName="image">
 *     <Label value="Car" />
 *     <Label value="Sign" />
 *   </PolygonLabels>
 * </View>
 * @name PolygonLabels
 * @param {string} name                             - name of tag
 * @param {string} toName                           - name of image to label
 * @param {single|multiple=} [choice=single]        - configure if you can select just one or multiple labels
 * @param {number} [maxUsages]                      - maximum available usages
 * @param {boolean} [showInline=true]               - show items in the same visual line
 * @param {number} [opacity=0.6]                    - opacity of polygon
 * @param {string} [fillColor]                      - rectangle fill color, default is transparent
 * @param {string} [strokeColor]                    - stroke color
 * @param {number} [strokeWidth=1]                  - width of stroke
 * @param {small|medium|large} [pointSize=medium]   - size of polygon handle points
 * @param {rectangle|circle} [pointStyle=rectangle] - style of points
 */
const TagAttrs = types.model({
  name: types.identifier,
  toname: types.maybeNull(types.string),
});

const Validation = types.model({
  controlledTags: Types.unionTag(["Image"]),
});

const ModelAttrs = types.model("PolygonLabelsModel", {
  type: "polygonlabels",
  children: Types.unionArray(["label", "header", "view", "hypertext"]),
});

const Composition = types.compose(
  LabelsModel,
  ModelAttrs,
  PolygonModel,
  TagAttrs,
  Validation,
  LabelMixin,
  SelectedModelMixin.props({ _child: "LabelModel" }),
  ControlBase,
);

const PolygonLabelsModel = types.compose("PolygonLabelsModel", Composition);

const HtxPolygonLabels = observer(({ item }) => {
  return <HtxLabels item={item} />;
});

Registry.addTag("polygonlabels", PolygonLabelsModel, HtxPolygonLabels);

export { HtxPolygonLabels, PolygonLabelsModel };
