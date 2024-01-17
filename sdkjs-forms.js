[
  {
    "comment": "/**\n\t * Base class\n\t * @global\n\t * @class\n\t * @name Api\n\t */",
    "meta": {
      "filename": "apiBuilder.js",
      "lineno": 48,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {}
    },
    "description": "Base class",
    "scope": "global",
    "kind": "class",
    "name": "Api",
    "longname": "Api"
  },
  {
    "comment": "/**\n\t * Common form properties.\n\t * @typedef {Object} FormPrBase\n\t * @property {string} key - Form key.\n\t * @property {string} tip - Form tip text.\n\t * @property {boolean} required - Specifies if the form is required or not.\n\t * @property {string} placeholder - Form placeholder text.\n\t */",
    "meta": {
      "filename": "apiBuilder.js",
      "lineno": 56,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {}
    },
    "description": "Common form properties.",
    "kind": "typedef",
    "name": "FormPrBase",
    "type": {
      "names": [
        "Object"
      ]
    },
    "properties": [
      {
        "type": {
          "names": [
            "string"
          ]
        },
        "description": "Form key.",
        "name": "key"
      },
      {
        "type": {
          "names": [
            "string"
          ]
        },
        "description": "Form tip text.",
        "name": "tip"
      },
      {
        "type": {
          "names": [
            "boolean"
          ]
        },
        "description": "Specifies if the form is required or not.",
        "name": "required"
      },
      {
        "type": {
          "names": [
            "string"
          ]
        },
        "description": "Form placeholder text.",
        "name": "placeholder"
      }
    ],
    "longname": "FormPrBase",
    "scope": "global"
  },
  {
    "comment": "/**\n\t * Specific text field properties.\n\t * @typedef {Object} TextFormPrBase\n\t * @property {boolean} comb - Specifies if the text field should be a comb of characters with the same cell width. The maximum number of characters must be set to a positive value.\n\t * @property {number} maxCharacters - The maximum number of characters in the text field.\n\t * @property {number} cellWidth - The cell width for each character measured in millimeters. If this parameter is not specified or equal to 0 or less, then the width will be set automatically.\n\t * @property {boolean} multiLine - Specifies if the current fixed size text field is multiline or not.\n\t * @property {boolean} autoFit - Specifies if the text field content should be autofit, i.e. whether the font size adjusts to the size of the fixed size form.\n\t */",
    "meta": {
      "filename": "apiBuilder.js",
      "lineno": 65,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {}
    },
    "description": "Specific text field properties.",
    "kind": "typedef",
    "name": "TextFormPrBase",
    "type": {
      "names": [
        "Object"
      ]
    },
    "properties": [
      {
        "type": {
          "names": [
            "boolean"
          ]
        },
        "description": "Specifies if the text field should be a comb of characters with the same cell width. The maximum number of characters must be set to a positive value.",
        "name": "comb"
      },
      {
        "type": {
          "names": [
            "number"
          ]
        },
        "description": "The maximum number of characters in the text field.",
        "name": "maxCharacters"
      },
      {
        "type": {
          "names": [
            "number"
          ]
        },
        "description": "The cell width for each character measured in millimeters. If this parameter is not specified or equal to 0 or less, then the width will be set automatically.",
        "name": "cellWidth"
      },
      {
        "type": {
          "names": [
            "boolean"
          ]
        },
        "description": "Specifies if the current fixed size text field is multiline or not.",
        "name": "multiLine"
      },
      {
        "type": {
          "names": [
            "boolean"
          ]
        },
        "description": "Specifies if the text field content should be autofit, i.e. whether the font size adjusts to the size of the fixed size form.",
        "name": "autoFit"
      }
    ],
    "longname": "TextFormPrBase",
    "scope": "global"
  },
  {
    "comment": "/**\n\t * Text field properties.\n\t * @typedef {FormPrBase | TextFormPrBase} TextFormPr\n\t */",
    "meta": {
      "filename": "apiBuilder.js",
      "lineno": 75,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {}
    },
    "description": "Text field properties.",
    "kind": "typedef",
    "name": "TextFormPr",
    "type": {
      "names": [
        "FormPrBase",
        "TextFormPrBase"
      ]
    },
    "longname": "TextFormPr",
    "scope": "global"
  },
  {
    "comment": "/**\n\t * Form insertion specific properties.\n\t * @typedef {Object} FormInsertPr\n\t * @property {boolean} [placeholderFromSelection=false] - Specifies if the currently selected text should be saved as a placeholder of the inserted form.\n\t * @property {boolean} [keepSelectedTextInForm=true] - Specifies if the currently selected text should be saved as the content of the inserted form.\n\t */",
    "meta": {
      "filename": "apiBuilder.js",
      "lineno": 80,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {}
    },
    "description": "Form insertion specific properties.",
    "kind": "typedef",
    "name": "FormInsertPr",
    "type": {
      "names": [
        "Object"
      ]
    },
    "properties": [
      {
        "type": {
          "names": [
            "boolean"
          ]
        },
        "optional": true,
        "defaultvalue": false,
        "description": "Specifies if the currently selected text should be saved as a placeholder of the inserted form.",
        "name": "placeholderFromSelection"
      },
      {
        "type": {
          "names": [
            "boolean"
          ]
        },
        "optional": true,
        "defaultvalue": true,
        "description": "Specifies if the currently selected text should be saved as the content of the inserted form.",
        "name": "keepSelectedTextInForm"
      }
    ],
    "longname": "FormInsertPr",
    "scope": "global"
  },
  {
    "comment": "/**\n\t * Properties for inserting a text field.\n\t * @typedef {FormPrBase | TextFormPrBase | FormInsertPr} TextFormInsertPr\n\t */",
    "meta": {
      "filename": "apiBuilder.js",
      "lineno": 87,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {}
    },
    "description": "Properties for inserting a text field.",
    "kind": "typedef",
    "name": "TextFormInsertPr",
    "type": {
      "names": [
        "FormPrBase",
        "TextFormPrBase",
        "FormInsertPr"
      ]
    },
    "longname": "TextFormInsertPr",
    "scope": "global"
  },
  {
    "comment": "/**\n\t * Specific checkbox / radio button properties.\n\t * @typedef {Object} CheckBoxFormPrBase\n\t * @property {boolean} radio - Specifies if the current checkbox is a radio button. In this case, the key parameter is considered as an identifier for the group of radio buttons.\n\t */",
    "meta": {
      "filename": "apiBuilder.js",
      "lineno": 93,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {}
    },
    "description": "Specific checkbox / radio button properties.",
    "kind": "typedef",
    "name": "CheckBoxFormPrBase",
    "type": {
      "names": [
        "Object"
      ]
    },
    "properties": [
      {
        "type": {
          "names": [
            "boolean"
          ]
        },
        "description": "Specifies if the current checkbox is a radio button. In this case, the key parameter is considered as an identifier for the group of radio buttons.",
        "name": "radio"
      }
    ],
    "longname": "CheckBoxFormPrBase",
    "scope": "global"
  },
  {
    "comment": "/**\n\t * Checkbox / radio button properties.\n\t * @typedef {FormPrBase | CheckBoxFormPrBase} CheckBoxFormPr\n\t */",
    "meta": {
      "filename": "apiBuilder.js",
      "lineno": 99,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {}
    },
    "description": "Checkbox / radio button properties.",
    "kind": "typedef",
    "name": "CheckBoxFormPr",
    "type": {
      "names": [
        "FormPrBase",
        "CheckBoxFormPrBase"
      ]
    },
    "longname": "CheckBoxFormPr",
    "scope": "global"
  },
  {
    "comment": "/**\n\t * Specific combo box / dropdown list properties.\n\t * @typedef {Object} ComboBoxFormPrBase\n\t * @property {boolean} editable - Specifies if the combo box text can be edited.\n\t * @property {boolean} autoFit - Specifies if the combo box form content should be autofit, i.e. whether the font size adjusts to the size of the fixed size form.\n\t * @property {Array.<string | Array.<string>>} items - The combo box items.\n     * This array consists of strings or arrays of two strings where the first string is the displayed value and the second one is its meaning.\n     * If the array consists of single strings, then the displayed value and its meaning are the same.\n     * Example: [\"First\", [\"Second\", \"2\"], [\"Third\", \"3\"], \"Fourth\"].\n\n\t */",
    "meta": {
      "filename": "apiBuilder.js",
      "lineno": 104,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {}
    },
    "description": "Specific combo box / dropdown list properties.",
    "kind": "typedef",
    "name": "ComboBoxFormPrBase",
    "type": {
      "names": [
        "Object"
      ]
    },
    "properties": [
      {
        "type": {
          "names": [
            "boolean"
          ]
        },
        "description": "Specifies if the combo box text can be edited.",
        "name": "editable"
      },
      {
        "type": {
          "names": [
            "boolean"
          ]
        },
        "description": "Specifies if the combo box form content should be autofit, i.e. whether the font size adjusts to the size of the fixed size form.",
        "name": "autoFit"
      },
      {
        "type": {
          "names": [
            "Array.<(string|Array.<string>)>"
          ]
        },
        "description": "The combo box items.\nThis array consists of strings or arrays of two strings where the first string is the displayed value and the second one is its meaning.\nIf the array consists of single strings, then the displayed value and its meaning are the same.\nExample: [\"First\", [\"Second\", \"2\"], [\"Third\", \"3\"], \"Fourth\"].",
        "name": "items"
      }
    ],
    "longname": "ComboBoxFormPrBase",
    "scope": "global"
  },
  {
    "comment": "/**\n\t * Combo box / dropdown list properties.\n\t * @typedef {FormPrBase | ComboBoxFormPrBase} ComboBoxFormPr\n\t */",
    "meta": {
      "filename": "apiBuilder.js",
      "lineno": 116,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {}
    },
    "description": "Combo box / dropdown list properties.",
    "kind": "typedef",
    "name": "ComboBoxFormPr",
    "type": {
      "names": [
        "FormPrBase",
        "ComboBoxFormPrBase"
      ]
    },
    "longname": "ComboBoxFormPr",
    "scope": "global"
  },
  {
    "comment": "/**\n\t * The condition to scale an image in the picture form.\n\t * @typedef {\"always\" | \"never\" | \"tooBig\" | \"tooSmall\"} ScaleFlag\n\t */",
    "meta": {
      "filename": "apiBuilder.js",
      "lineno": 121,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {}
    },
    "description": "The condition to scale an image in the picture form.",
    "kind": "typedef",
    "name": "ScaleFlag",
    "type": {
      "names": [
        "\"always\"",
        "\"never\"",
        "\"tooBig\"",
        "\"tooSmall\""
      ]
    },
    "longname": "ScaleFlag",
    "scope": "global"
  },
  {
    "comment": "/**\n\t * Value from 0 to 100.\n\t * @typedef {number} percentage\n\t */",
    "meta": {
      "filename": "apiBuilder.js",
      "lineno": 126,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {}
    },
    "description": "Value from 0 to 100.",
    "kind": "typedef",
    "name": "percentage",
    "type": {
      "names": [
        "number"
      ]
    },
    "longname": "percentage",
    "scope": "global"
  },
  {
    "comment": "/**\n\t * Specific picture form properties.\n\t * @typedef {Object} PictureFormPrBase\n\t * @property {ScaleFlag} scaleFlag - The condition to scale an image in the picture form: \"always\", \"never\", \"tooBig\" or \"tooSmall\".\n\t * @property {boolean} lockAspectRatio - Specifies if the aspect ratio of the picture form is locked or not.\n\t * @property {boolean} respectBorders - Specifies if the form border width is respected or not when scaling the image.\n\t * @property {percentage} shiftX - Horizontal picture position inside the picture form measured in percent:\n\t * * <b>0</b> - the picture is placed on the left;\n\t * * <b>50</b> - the picture is placed in the center;\n\t * * <b>100</b> - the picture is placed on the right.\n\t * @property {percentage} shiftY - Vertical picture position inside the picture form measured in percent:\n\t * * <b>0</b> - the picture is placed on top;\n\t * * <b>50</b> - the picture is placed in the center;\n\t * * <b>100</b> - the picture is placed on the bottom.\n\t */",
    "meta": {
      "filename": "apiBuilder.js",
      "lineno": 131,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {}
    },
    "description": "Specific picture form properties.",
    "kind": "typedef",
    "name": "PictureFormPrBase",
    "type": {
      "names": [
        "Object"
      ]
    },
    "properties": [
      {
        "type": {
          "names": [
            "ScaleFlag"
          ]
        },
        "description": "The condition to scale an image in the picture form: \"always\", \"never\", \"tooBig\" or \"tooSmall\".",
        "name": "scaleFlag"
      },
      {
        "type": {
          "names": [
            "boolean"
          ]
        },
        "description": "Specifies if the aspect ratio of the picture form is locked or not.",
        "name": "lockAspectRatio"
      },
      {
        "type": {
          "names": [
            "boolean"
          ]
        },
        "description": "Specifies if the form border width is respected or not when scaling the image.",
        "name": "respectBorders"
      },
      {
        "type": {
          "names": [
            "percentage"
          ]
        },
        "description": "Horizontal picture position inside the picture form measured in percent:\n* <b>0</b> - the picture is placed on the left;\n* <b>50</b> - the picture is placed in the center;\n* <b>100</b> - the picture is placed on the right.",
        "name": "shiftX"
      },
      {
        "type": {
          "names": [
            "percentage"
          ]
        },
        "description": "Vertical picture position inside the picture form measured in percent:\n* <b>0</b> - the picture is placed on top;\n* <b>50</b> - the picture is placed in the center;\n* <b>100</b> - the picture is placed on the bottom.",
        "name": "shiftY"
      }
    ],
    "longname": "PictureFormPrBase",
    "scope": "global"
  },
  {
    "comment": "/**\n\t * Picture form properties.\n\t * @typedef {FormPrBase | PictureFormPrBase} PictureFormPr\n\t */",
    "meta": {
      "filename": "apiBuilder.js",
      "lineno": 147,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {}
    },
    "description": "Picture form properties.",
    "kind": "typedef",
    "name": "PictureFormPr",
    "type": {
      "names": [
        "FormPrBase",
        "PictureFormPrBase"
      ]
    },
    "longname": "PictureFormPr",
    "scope": "global"
  },
  {
    "comment": "/**\n\t * Creates a text field with the specified text field properties.\n\t * @memberof Api\n\t * @param {TextFormPr} oFormPr - Text field properties.\n\t * @returns {ApiTextForm}\n\t */",
    "meta": {
      "range": [
        6890,
        7117
      ],
      "filename": "apiBuilder.js",
      "lineno": 158,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {
        "id": "astnode100000061",
        "name": "Api.prototype.CreateTextForm",
        "type": "FunctionExpression",
        "funcscope": "<anonymous>",
        "paramnames": [
          "oFormPr"
        ]
      },
      "vars": {
        "oFormPr": "Api#CreateTextForm~oFormPr",
        "form": "Api#CreateTextForm~form"
      }
    },
    "description": "Creates a text field with the specified text field properties.",
    "memberof": "Api",
    "params": [
      {
        "type": {
          "names": [
            "TextFormPr"
          ]
        },
        "description": "Text field properties.",
        "name": "oFormPr"
      }
    ],
    "returns": [
      {
        "type": {
          "names": [
            "ApiTextForm"
          ]
        }
      }
    ],
    "name": "CreateTextForm",
    "longname": "Api#CreateTextForm",
    "kind": "function",
    "scope": "instance"
  },
  {
    "comment": "/**\n\t * Creates a checkbox / radio button with the specified checkbox / radio button properties.\n\t * @memberof Api\n\t * @param {CheckBoxFormPr} oFormPr - Checkbox / radio button properties.\n\t * @returns {ApiCheckBoxForm}\n\t */",
    "meta": {
      "range": [
        7346,
        9341
      ],
      "filename": "apiBuilder.js",
      "lineno": 174,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {
        "id": "astnode100000099",
        "name": "Api.prototype.CreateCheckBoxForm",
        "type": "FunctionExpression",
        "funcscope": "<anonymous>",
        "paramnames": [
          "oFormPr"
        ]
      },
      "vars": {
        "oFormPr": "Api#CreateCheckBoxForm~oFormPr",
        "oFormPr[\"placeholder\"]": "Api#CreateCheckBoxForm~oFormPr.\"placeholder\"]",
        "oCC": "Api#CreateCheckBoxForm~oCC",
        "oCheckboxPr": "Api#CreateCheckBoxForm~oCheckboxPr",
        "oCheckboxPr.CheckedSymbol": "Api#CreateCheckBoxForm~oCheckboxPr.CheckedSymbol",
        "oCheckboxPr.UncheckedSymbol": "Api#CreateCheckBoxForm~oCheckboxPr.UncheckedSymbol",
        "oCheckboxPr.GroupKey": "Api#CreateCheckBoxForm~oCheckboxPr.GroupKey",
        "oCheckboxPr.CheckedFont": "Api#CreateCheckBoxForm~oCheckboxPr.CheckedFont",
        "oCheckboxPr.UncheckedFont": "Api#CreateCheckBoxForm~oCheckboxPr.UncheckedFont",
        "nCheckedSymbol": "Api#CreateCheckBoxForm~nCheckedSymbol",
        "nUncheckedSymbol": "Api#CreateCheckBoxForm~nUncheckedSymbol",
        "sCheckedFont": "Api#CreateCheckBoxForm~sCheckedFont",
        "sUncheckedFont": "Api#CreateCheckBoxForm~sUncheckedFont",
        "isLoadFonts": "Api#CreateCheckBoxForm~isLoadFonts",
        "private_PerformAddCheckBox": "Api#CreateCheckBoxForm~private_PerformAddCheckBox",
        "oFonts": "Api#CreateCheckBoxForm~oFonts",
        "oFonts[undefined]": "Api#CreateCheckBoxForm~oFonts.undefined]"
      }
    },
    "description": "Creates a checkbox / radio button with the specified checkbox / radio button properties.",
    "memberof": "Api",
    "params": [
      {
        "type": {
          "names": [
            "CheckBoxFormPr"
          ]
        },
        "description": "Checkbox / radio button properties.",
        "name": "oFormPr"
      }
    ],
    "returns": [
      {
        "type": {
          "names": [
            "ApiCheckBoxForm"
          ]
        }
      }
    ],
    "name": "CreateCheckBoxForm",
    "longname": "Api#CreateCheckBoxForm",
    "kind": "function",
    "scope": "instance"
  },
  {
    "comment": "/**\n\t * Creates a combo box / dropdown list with the specified combo box / dropdown list properties.\n\t * @memberof Api\n\t * @param {ComboBoxFormPr} oFormPr - Combo box / dropdown list properties.\n\t * @returns {ApiComboBoxForm}\n\t */",
    "meta": {
      "range": [
        9576,
        10886
      ],
      "filename": "apiBuilder.js",
      "lineno": 244,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {
        "id": "astnode100000361",
        "name": "Api.prototype.CreateComboBoxForm",
        "type": "FunctionExpression",
        "funcscope": "<anonymous>",
        "paramnames": [
          "oFormPr"
        ]
      },
      "vars": {
        "oFormPr": "Api#CreateComboBoxForm~oFormPr",
        "oPr": "Api#CreateComboBoxForm~oPr",
        "oCC": "Api#CreateComboBoxForm~oCC",
        "sPlaceholder": "Api#CreateComboBoxForm~sPlaceholder",
        "arrList": "Api#CreateComboBoxForm~arrList",
        "nIndex": "Api#CreateComboBoxForm~nIndex",
        "nCount": "Api#CreateComboBoxForm~nCount",
        "oItem": "Api#CreateComboBoxForm~oItem",
        "sDisplay": "Api#CreateComboBoxForm~sDisplay",
        "sValue": "Api#CreateComboBoxForm~sValue"
      }
    },
    "description": "Creates a combo box / dropdown list with the specified combo box / dropdown list properties.",
    "memberof": "Api",
    "params": [
      {
        "type": {
          "names": [
            "ComboBoxFormPr"
          ]
        },
        "description": "Combo box / dropdown list properties.",
        "name": "oFormPr"
      }
    ],
    "returns": [
      {
        "type": {
          "names": [
            "ApiComboBoxForm"
          ]
        }
      }
    ],
    "name": "CreateComboBoxForm",
    "longname": "Api#CreateComboBoxForm",
    "kind": "function",
    "scope": "instance"
  },
  {
    "comment": "/**\n\t * Creates a picture form with the specified picture form properties.\n\t * @memberof Api\n\t * @param {PictureFormPr} oFormPr - Picture form properties.\n\t * @returns {ApiPictureForm}\n\t */",
    "meta": {
      "range": [
        11080,
        12319
      ],
      "filename": "apiBuilder.js",
      "lineno": 309,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {
        "id": "astnode100000569",
        "name": "Api.prototype.CreatePictureForm",
        "type": "FunctionExpression",
        "funcscope": "<anonymous>",
        "paramnames": [
          "oFormPr"
        ]
      },
      "vars": {
        "oFormPr": "Api#CreatePictureForm~oFormPr",
        "oFormPr[\"placeholder\"]": "Api#CreatePictureForm~oFormPr.\"placeholder\"]",
        "oCC": "Api#CreatePictureForm~oCC",
        "oPr": "Api#CreatePictureForm~oPr",
        "sScale": "Api#CreatePictureForm~sScale"
      }
    },
    "description": "Creates a picture form with the specified picture form properties.",
    "memberof": "Api",
    "params": [
      {
        "type": {
          "names": [
            "PictureFormPr"
          ]
        },
        "description": "Picture form properties.",
        "name": "oFormPr"
      }
    ],
    "returns": [
      {
        "type": {
          "names": [
            "ApiPictureForm"
          ]
        }
      }
    ],
    "name": "CreatePictureForm",
    "longname": "Api#CreatePictureForm",
    "kind": "function",
    "scope": "instance"
  },
  {
    "comment": "/**\n\t * Inserts a text box with the specified text box properties over the selected text.\n\t * @memberof ApiDocument\n\t * @param {TextFormInsertPr} oFormPr - Properties for inserting a text field.\n\t * @returns {ApiTextForm}\n\t */",
    "meta": {
      "range": [
        12550,
        13345
      ],
      "filename": "apiBuilder.js",
      "lineno": 348,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {
        "id": "astnode100000774",
        "name": "ApiDocument.prototype.InsertTextForm",
        "type": "FunctionExpression",
        "funcscope": "<anonymous>",
        "paramnames": [
          "oFormPr"
        ]
      },
      "vars": {
        "oFormPr": "ApiDocument#InsertTextForm~oFormPr",
        "logicDocument": "ApiDocument#InsertTextForm~logicDocument",
        "placeholder": "ApiDocument#InsertTextForm~placeholder",
        "contentControl": "ApiDocument#InsertTextForm~contentControl"
      }
    },
    "description": "Inserts a text box with the specified text box properties over the selected text.",
    "memberof": "ApiDocument",
    "params": [
      {
        "type": {
          "names": [
            "TextFormInsertPr"
          ]
        },
        "description": "Properties for inserting a text field.",
        "name": "oFormPr"
      }
    ],
    "returns": [
      {
        "type": {
          "names": [
            "ApiTextForm"
          ]
        }
      }
    ],
    "name": "InsertTextForm",
    "longname": "ApiDocument#InsertTextForm",
    "kind": "function",
    "scope": "instance"
  },
  {
    "comment": "/**\n     * @typedef {Object} ContentControl\n\t * Content control object.\n     * @property {string} Tag - A tag assigned to the content control. The same tag can be assigned to several content controls so that it is possible to make reference to them in your code.\n     * @property {string} Id - A unique identifier of the content control. It can be used to search for a certain content control and make reference to it in the code.\n     * @property {ContentControlLock} Lock - A value that defines if it is possible to delete and/or edit the content control or not: 0 - only deleting, 1 - no deleting or editing, 2 - only editing, 3 - full access.\n     * @property {string} InternalId - A unique internal identifier of the content control. It is used for all operations with content controls.\n     */",
    "meta": {
      "filename": "apiPlugins.js",
      "lineno": 37,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {}
    },
    "kind": "typedef",
    "name": "ContentControl",
    "type": {
      "names": [
        "Object"
      ]
    },
    "description": "Content control object.",
    "properties": [
      {
        "type": {
          "names": [
            "string"
          ]
        },
        "description": "A tag assigned to the content control. The same tag can be assigned to several content controls so that it is possible to make reference to them in your code.",
        "name": "Tag"
      },
      {
        "type": {
          "names": [
            "string"
          ]
        },
        "description": "A unique identifier of the content control. It can be used to search for a certain content control and make reference to it in the code.",
        "name": "Id"
      },
      {
        "type": {
          "names": [
            "ContentControlLock"
          ]
        },
        "description": "A value that defines if it is possible to delete and/or edit the content control or not: 0 - only deleting, 1 - no deleting or editing, 2 - only editing, 3 - full access.",
        "name": "Lock"
      },
      {
        "type": {
          "names": [
            "string"
          ]
        },
        "description": "A unique internal identifier of the content control. It is used for all operations with content controls.",
        "name": "InternalId"
      }
    ],
    "longname": "ContentControl",
    "scope": "global"
  },
  {
    "comment": "/**\n     * @typedef {(0 | 1 | 2 | 3)} ContentControlLock\n     * A value that defines if it is possible to delete and/or edit the content control or not:\n\t * * **0** - only deleting\n\t * * **1** - disable deleting or editing\n\t * * **2** - only editing\n\t * * **3** - full access\n     */",
    "meta": {
      "filename": "apiPlugins.js",
      "lineno": 46,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {}
    },
    "kind": "typedef",
    "name": "ContentControlLock",
    "type": {
      "names": [
        "0",
        "1",
        "2",
        "3"
      ]
    },
    "description": "A value that defines if it is possible to delete and/or edit the content control or not:\n* **0** - only deleting\n* **1** - disable deleting or editing\n* **2** - only editing\n* **3** - full access",
    "longname": "ContentControlLock",
    "scope": "global"
  },
  {
    "comment": "/**\n\t * Returns information about all the forms that have been added to the document.\n\t * @memberof Api\n\t * @typeofeditors [\"CDE\"]\n\t * @alias GetAllForms\n\t * @returns {ContentControl[]} - An array with all the forms from the document.\n\t * @example\n\t * window.Asc.plugin.executeMethod(\"GetAllForms\");\n\t */",
    "meta": {
      "range": [
        2981,
        3400
      ],
      "filename": "apiPlugins.js",
      "lineno": 64,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {
        "id": "astnode100001250",
        "name": "window[\"asc_docs_api\"].prototype[\"pluginMethod_GetAllForms\"]",
        "type": "FunctionExpression",
        "paramnames": []
      },
      "vars": {
        "oFormsManager": "GetAllForms~oFormsManager",
        "arrForms": "GetAllForms~arrForms",
        "arrResult": "GetAllForms~arrResult",
        "nIndex": "GetAllForms~nIndex",
        "nCount": "GetAllForms~nCount"
      }
    },
    "description": "Returns information about all the forms that have been added to the document.",
    "memberof": "Api",
    "tags": [
      {
        "originalTitle": "typeofeditors",
        "title": "typeofeditors",
        "text": "[\"CDE\"]",
        "value": "[\"CDE\"]"
      }
    ],
    "alias": "GetAllForms",
    "returns": [
      {
        "type": {
          "names": [
            "Array.<ContentControl>"
          ]
        },
        "description": "- An array with all the forms from the document."
      }
    ],
    "examples": [
      "window.Asc.plugin.executeMethod(\"GetAllForms\");"
    ],
    "name": "GetAllForms",
    "longname": "GetAllForms",
    "kind": "function"
  },
  {
    "comment": "/**\n\t * Returns information about all the forms that have been added to the document with specified tag.\n\t * @memberof Api\n\t * @typeofeditors [\"CDE\"]\n\t * @alias GetFormsByTag\n\t * @param {string} tag - The form tag.\n\t * @returns {ContentControl[]} - An array with all the forms from the document with the specified tag.\n\t * @example\n\t * window.Asc.plugin.executeMethod(\"GetFormsByTag\");\n\t */",
    "meta": {
      "range": [
        3795,
        4293
      ],
      "filename": "apiPlugins.js",
      "lineno": 88,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {
        "id": "astnode100001316",
        "name": "window[\"asc_docs_api\"].prototype[\"pluginMethod_GetFormsByTag\"]",
        "type": "FunctionExpression",
        "paramnames": [
          "tag"
        ]
      },
      "vars": {
        "oFormsManager": "GetFormsByTag~oFormsManager",
        "arrForms": "GetFormsByTag~arrForms",
        "arrResult": "GetFormsByTag~arrResult",
        "oForm": "GetFormsByTag~oForm",
        "nIndex": "GetFormsByTag~nIndex",
        "nCount": "GetFormsByTag~nCount"
      }
    },
    "description": "Returns information about all the forms that have been added to the document with specified tag.",
    "memberof": "Api",
    "tags": [
      {
        "originalTitle": "typeofeditors",
        "title": "typeofeditors",
        "text": "[\"CDE\"]",
        "value": "[\"CDE\"]"
      }
    ],
    "alias": "GetFormsByTag",
    "params": [
      {
        "type": {
          "names": [
            "string"
          ]
        },
        "description": "The form tag.",
        "name": "tag"
      }
    ],
    "returns": [
      {
        "type": {
          "names": [
            "Array.<ContentControl>"
          ]
        },
        "description": "- An array with all the forms from the document with the specified tag."
      }
    ],
    "examples": [
      "window.Asc.plugin.executeMethod(\"GetFormsByTag\");"
    ],
    "name": "GetFormsByTag",
    "longname": "GetFormsByTag",
    "kind": "function"
  },
  {
    "comment": "/**\n\t * Sets a value to the specified form.\n\t * @memberof Api\n\t * @typeofeditors [\"CDE\"]\n\t * @alias SetFormValue\n\t * @param {string} internalId - A unique internal identifier of the form.\n\t * @param {string | boolean} value - Form value to be set. Its type depends on the form type.\n\t * @example\n\t * window.Asc.plugin.executeMethod(\"SetFormValue\");\n\t */",
    "meta": {
      "range": [
        4651,
        4796
      ],
      "filename": "apiPlugins.js",
      "lineno": 115,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {
        "id": "astnode100001398",
        "name": "window[\"asc_docs_api\"].prototype[\"pluginMethod_SetFormValue\"]",
        "type": "FunctionExpression",
        "paramnames": [
          "internalId",
          "value"
        ]
      }
    },
    "description": "Sets a value to the specified form.",
    "memberof": "Api",
    "tags": [
      {
        "originalTitle": "typeofeditors",
        "title": "typeofeditors",
        "text": "[\"CDE\"]",
        "value": "[\"CDE\"]"
      }
    ],
    "alias": "SetFormValue",
    "params": [
      {
        "type": {
          "names": [
            "string"
          ]
        },
        "description": "A unique internal identifier of the form.",
        "name": "internalId"
      },
      {
        "type": {
          "names": [
            "string",
            "boolean"
          ]
        },
        "description": "Form value to be set. Its type depends on the form type.",
        "name": "value"
      }
    ],
    "examples": [
      "window.Asc.plugin.executeMethod(\"SetFormValue\");"
    ],
    "name": "SetFormValue",
    "longname": "SetFormValue",
    "kind": "function"
  },
  {
    "comment": "/**\n\t * Returns a value of the specified form.\n\t * @memberof Api\n\t * @typeofeditors [\"CDE\"]\n\t * @alias GetFormValue\n\t * @param {string} internalId - A unique internal identifier of the form.\n\t * @returns {null | string | boolean} The form value in the string or boolean format depending on the form type. The null value means that the form is filled with a placeholder.\n\t * @example\n\t * window.Asc.plugin.executeMethod(\"GetFormValue\");\n\t *\n\t */",
    "meta": {
      "range": [
        5245,
        6132
      ],
      "filename": "apiPlugins.js",
      "lineno": 130,
      "columnno": 1,
      "path": "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d",
      "code": {
        "id": "astnode100001418",
        "name": "window[\"asc_docs_api\"].prototype[\"pluginMethod_GetFormValue\"]",
        "type": "FunctionExpression",
        "paramnames": [
          "internalId"
        ]
      },
      "vars": {
        "oForm": "GetFormValue~oForm",
        "oImg": "GetFormValue~oImg",
        "allDrawings": "GetFormValue~allDrawings",
        "nDrawing": "GetFormValue~nDrawing"
      }
    },
    "description": "Returns a value of the specified form.",
    "memberof": "Api",
    "tags": [
      {
        "originalTitle": "typeofeditors",
        "title": "typeofeditors",
        "text": "[\"CDE\"]",
        "value": "[\"CDE\"]"
      }
    ],
    "alias": "GetFormValue",
    "params": [
      {
        "type": {
          "names": [
            "string"
          ]
        },
        "description": "A unique internal identifier of the form.",
        "name": "internalId"
      }
    ],
    "returns": [
      {
        "type": {
          "names": [
            "null",
            "string",
            "boolean"
          ]
        },
        "description": "The form value in the string or boolean format depending on the form type. The null value means that the form is filled with a placeholder."
      }
    ],
    "examples": [
      "window.Asc.plugin.executeMethod(\"GetFormValue\");"
    ],
    "name": "GetFormValue",
    "longname": "GetFormValue",
    "kind": "function"
  },
  {
    "kind": "package",
    "longname": "package:undefined",
    "files": [
      "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d/apiBuilder.js",
      "https://github.com/onlyoffice/sdkjs-forms/blob/d16707c294a3b88a6cdbe5fb7c6e772a73631b6d/apiPlugins.js"
    ]
  }
]