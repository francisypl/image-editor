import React, { useState, useCallback } from "react";
import cx from "classnames";

import { Image } from "./Image";
import ImageEditorState from "../../Editor/ImageEditorState";
import Layer from "../../Editor/Layer";
import Align from "../../Editor/Align";
import ImageToolbar from "../../Editor/ImageToolbar";
import CropEditor from "../../Editor/CropEditor";
import * as cropStyles from "../../constants/cropStyles";

export function EditableImage({ style, ...props }) {
  const [showEditOption, setShowEditOption] = useState(false);
  const [showCropEditor, setShowCropEditor] = useState(false);
  const [cropStyle, setCropStyle] = useState(cropStyles.freeform);
  const [ref, setRef] = useState();

  const saveRef = useCallback(ref => {
    setRef(ref);
  }, []);

  function handleStartCrop(cropStyle) {
    setShowCropEditor(true);
    setCropStyle(cropStyle);
  }

  const imageEditToolbar = showEditOption ? (
    <Layer>
      <Align node={ref} offset={{ top: 47, left: -10 }}>
        <ImageToolbar onStartCrop={handleStartCrop} />
      </Align>
    </Layer>
  ) : null;

  const shouldDisplayImage = !showCropEditor;

  return (
    <div
      className={cx("image-edit-container", {
        active: showEditOption
      })}
      ref={saveRef}
      onMouseOver={() => setShowEditOption(true)}
      onMouseLeave={() => setShowEditOption(false)}
    >
      {imageEditToolbar}
      {shouldDisplayImage && (
        <Image style={{ width: "100%", ...style }} {...props} />
      )}
      {showCropEditor && <CropEditor cropStyle={cropStyle} />}
    </div>
  );
}
