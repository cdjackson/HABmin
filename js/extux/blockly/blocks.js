/*! ExtBlockly 2014-05-09 */
/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Colour blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Blocks.colour = {};

Blockly.Blocks['colour_picker'] = {
    /**
     * Block for colour picker.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.COLOUR_PICKER_HELPURL);
        this.setColour(20);
        this.appendDummyInput()
            .appendField(new Blockly.FieldColour('#ff0000'), 'COLOUR');
        this.setOutput(true, 'Colour');
        this.setTooltip(Blockly.Msg.COLOUR_PICKER_TOOLTIP);
    }
};

Blockly.Blocks['colour_random'] = {
    /**
     * Block for random colour.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.COLOUR_RANDOM_HELPURL);
        this.setColour(20);
        this.appendDummyInput()
            .appendField(Blockly.Msg.COLOUR_RANDOM_TITLE);
        this.setOutput(true, 'Colour');
        this.setTooltip(Blockly.Msg.COLOUR_RANDOM_TOOLTIP);
    }
};

Blockly.Blocks['colour_rgb'] = {
    /**
     * Block for composing a colour from RGB components.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.COLOUR_RGB_HELPURL);
        this.setColour(20);
        this.appendValueInput('RED')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.COLOUR_RGB_TITLE)
            .appendField(Blockly.Msg.COLOUR_RGB_RED);
        this.appendValueInput('GREEN')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.COLOUR_RGB_GREEN);
        this.appendValueInput('BLUE')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.COLOUR_RGB_BLUE);
        this.setOutput(true, 'Colour');
        this.setTooltip(Blockly.Msg.COLOUR_RGB_TOOLTIP);
    }
};

Blockly.Blocks['colour_blend'] = {
    /**
     * Block for blending two colours together.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.COLOUR_BLEND_HELPURL);
        this.setColour(20);
        this.appendValueInput('COLOUR1')
            .setCheck('Colour')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.COLOUR_BLEND_TITLE)
            .appendField(Blockly.Msg.COLOUR_BLEND_COLOUR1);
        this.appendValueInput('COLOUR2')
            .setCheck('Colour')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.COLOUR_BLEND_COLOUR2);
        this.appendValueInput('RATIO')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.COLOUR_BLEND_RATIO);
        this.setOutput(true, 'Colour');
        this.setTooltip(Blockly.Msg.COLOUR_BLEND_TOOLTIP);
    }
};

/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview List blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Blocks.lists = {};


Blockly.Blocks['lists_create_empty'] = {
    /**
     * Block for creating an empty list.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.LISTS_CREATE_EMPTY_HELPURL);
        this.setColour(260);
        this.setOutput(true, 'Array');
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_EMPTY_TOOLTIP);
    }
};

Blockly.Blocks['lists_create_with'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(260);
        this.appendValueInput('ADD0')
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH);
        this.appendValueInput('ADD1');
        this.appendValueInput('ADD2');
        this.setOutput(true, 'Array');
        this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
        this.itemCount_ = 3;
    },
    /**
     * Create XML to represent list inputs.
     * @return {Array} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = [];
        var parameter = {};
        parameter.name = 'items';
        parameter.value = this.itemCount_;
        container.push(parameter);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var elements = [].concat(xmlElement);
        for (var x = 0; x < this.itemCount_; x++) {
            this.removeInput('ADD' + x);
        }
        if (elements[0].name.toLowerCase() == 'items') {
            this.itemCount_ = parseInt(elements[0].value, 10);
        }
        for (var x = 0; x < this.itemCount_; x++) {
            var input = this.appendValueInput('ADD' + x);
            if (x == 0) {
                input.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH);
            }
        }
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
        }
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock =
            Blockly.Block.obtain(workspace, 'lists_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var x = 0; x < this.itemCount_; x++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'lists_create_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        // Disconnect all input blocks and remove all inputs.
        if (this.itemCount_ == 0) {
            this.removeInput('EMPTY');
        } else {
            for (var x = this.itemCount_ - 1; x >= 0; x--) {
                this.removeInput('ADD' + x);
            }
        }
        this.itemCount_ = 0;
        // Rebuild the block's inputs.
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        while (itemBlock) {
            var input = this.appendValueInput('ADD' + this.itemCount_);
            if (this.itemCount_ == 0) {
                input.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH);
            }
            // Reconnect any child blocks.
            if (itemBlock.valueConnection_) {
                input.connection.connect(itemBlock.valueConnection_);
            }
            this.itemCount_++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var x = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + x);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            x++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    }
};

Blockly.Blocks['lists_create_with_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(260);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['lists_create_with_item'] = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(260);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['lists_repeat'] = {
    /**
     * Block for creating a list with one element repeated.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.LISTS_REPEAT_HELPURL);
        this.setColour(260);
        this.setOutput(true, 'Array');
        this.interpolateMsg(Blockly.Msg.LISTS_REPEAT_TITLE,
            ['ITEM', null, Blockly.ALIGN_RIGHT],
            ['NUM', 'Number', Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.Msg.LISTS_REPEAT_TOOLTIP);
    }
};

Blockly.Blocks['lists_length'] = {
    /**
     * Block for list length.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.LISTS_LENGTH_HELPURL);
        this.setColour(260);
        this.interpolateMsg(Blockly.Msg.LISTS_LENGTH_TITLE,
            ['VALUE', ['Array', 'String'], Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.LISTS_LENGTH_TOOLTIP);
    }
};

Blockly.Blocks['lists_isEmpty'] = {
    /**
     * Block for is the list empty?
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.LISTS_IS_EMPTY_HELPURL);
        this.setColour(260);
        this.interpolateMsg(Blockly.Msg.LISTS_IS_EMPTY_TITLE,
            ['VALUE', ['Array', 'String'], Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT)
        this.setInputsInline(true);
        this.setOutput(true, 'Boolean');
        this.setTooltip(Blockly.Msg.LISTS_TOOLTIP);
    }
};

Blockly.Blocks['lists_indexOf'] = {
    /**
     * Block for finding an item in the list.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS =
            [
                [Blockly.Msg.LISTS_INDEX_OF_FIRST, 'FIRST'],
                [Blockly.Msg.LISTS_INDEX_OF_LAST, 'LAST']
            ];
        this.setHelpUrl(Blockly.Msg.LISTS_INDEX_OF_HELPURL);
        this.setColour(260);
        this.setOutput(true, 'Number');
        this.appendValueInput('VALUE')
            .setCheck('Array')
            .appendField(Blockly.Msg.LISTS_INDEX_OF_INPUT_IN_LIST);
        this.appendValueInput('FIND')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'END');
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.LISTS_INDEX_OF_TOOLTIP);
    }
};

Blockly.Blocks['lists_getIndex'] = {
    /**
     * Block for getting element at index.
     * @this Blockly.Block
     */
    init: function () {
        var MODE =
            [
                [Blockly.Msg.LISTS_GET_INDEX_GET, 'GET'],
                [Blockly.Msg.LISTS_GET_INDEX_GET_REMOVE, 'GET_REMOVE'],
                [Blockly.Msg.LISTS_GET_INDEX_REMOVE, 'REMOVE']
            ];
        this.WHERE_OPTIONS =
            [
                [Blockly.Msg.LISTS_GET_INDEX_FROM_START, 'FROM_START'],
                [Blockly.Msg.LISTS_GET_INDEX_FROM_END, 'FROM_END'],
                [Blockly.Msg.LISTS_GET_INDEX_FIRST, 'FIRST'],
                [Blockly.Msg.LISTS_GET_INDEX_LAST, 'LAST'],
                [Blockly.Msg.LISTS_GET_INDEX_RANDOM, 'RANDOM']
            ];
        this.setHelpUrl(Blockly.Msg.LISTS_GET_INDEX_HELPURL);
        this.setColour(260);
        var modeMenu = new Blockly.FieldDropdown(MODE, function (value) {
            var isStatement = (value == 'REMOVE');
            this.sourceBlock_.updateStatement_(isStatement);
        });
        this.appendValueInput('VALUE')
            .setCheck('Array')
            .appendField(Blockly.Msg.LISTS_GET_INDEX_INPUT_IN_LIST);
        this.appendDummyInput()
            .appendField(modeMenu, 'MODE')
            .appendField('', 'SPACE');
        this.appendDummyInput('AT');
        if (Blockly.Msg.LISTS_GET_INDEX_TAIL) {
            this.appendDummyInput('TAIL')
                .appendField(Blockly.Msg.LISTS_GET_INDEX_TAIL);
        }
        this.setInputsInline(true);
        this.setOutput(true);
        this.updateAt_(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var combo = thisBlock.getFieldValue('MODE') + '_' +
                thisBlock.getFieldValue('WHERE');
            return Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_' + combo];
        });
    },
    /**
     * Create XML to represent whether the block is a statement or a value.
     * Also represent whether there is an 'AT' input.
     * @return {Array} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = [];
        var parameter = {};
        parameter.name = 'statement';
        parameter.value = !this.outputConnection;
        container.push(parameter);

        parameter.name = 'at';
        parameter.value = this.getInput('AT').type == Blockly.INPUT_VALUE;
        container.push(parameter);

        return container;
    },
    /**
     * Parse XML to restore the 'AT' input.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var elements = [].concat(xmlElement);
        for (var x = 0; x < elements.length; x++) {
            if (elements[x].name.toLowerCase() == 'statement') {
                this.updateStatement_(Blockly.Json.parseBoolean(elements[x].value));
            }
            if (elements[x].name.toLowerCase() == 'at') {
                this.updateAt_(Blockly.Json.parseBoolean(elements[x].value));
            }
        }
    },
    /**
     * Switch between a value block and a statement block.
     * @param {boolean} newStatement True if the block should be a statement.
     *     False if the block should be a value.
     * @private
     * @this Blockly.Block
     */
    updateStatement_: function (newStatement) {
        var oldStatement = !this.outputConnection;
        if (newStatement != oldStatement) {
            this.unplug(true, true);
            if (newStatement) {
                this.setOutput(false);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
            } else {
                this.setPreviousStatement(false);
                this.setNextStatement(false);
                this.setOutput(true);
            }
        }
    },
    /**
     * Create or delete an input for the numeric index.
     * @param {boolean} isAt True if the input should exist.
     * @private
     * @this Blockly.Block
     */
    updateAt_: function (isAt) {
        // Destroy old 'AT' and 'ORDINAL' inputs.
        this.removeInput('AT');
        this.removeInput('ORDINAL', true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT').setCheck('Number');
            if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
                this.appendDummyInput('ORDINAL')
                    .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
            }
        } else {
            this.appendDummyInput('AT');
        }
        var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function (value) {
            var newAt = (value == 'FROM_START') || (value == 'FROM_END');
            // The 'isAt' variable is available due to this function being a closure.
            if (newAt != isAt) {
                var block = this.sourceBlock_;
                block.updateAt_(newAt);
                // This menu has been destroyed and replaced.  Update the replacement.
                block.setFieldValue(value, 'WHERE');
                return null;
            }
            return undefined;
        });
        this.getInput('AT').appendField(menu, 'WHERE');
        if (Blockly.Msg.LISTS_GET_INDEX_TAIL) {
            this.moveInputBefore('TAIL', null);
        }
    }
};

Blockly.Blocks['lists_setIndex'] = {
    /**
     * Block for setting the element at index.
     * @this Blockly.Block
     */
    init: function () {
        var MODE =
            [
                [Blockly.Msg.LISTS_SET_INDEX_SET, 'SET'],
                [Blockly.Msg.LISTS_SET_INDEX_INSERT, 'INSERT']
            ];
        this.WHERE_OPTIONS =
            [
                [Blockly.Msg.LISTS_GET_INDEX_FROM_START, 'FROM_START'],
                [Blockly.Msg.LISTS_GET_INDEX_FROM_END, 'FROM_END'],
                [Blockly.Msg.LISTS_GET_INDEX_FIRST, 'FIRST'],
                [Blockly.Msg.LISTS_GET_INDEX_LAST, 'LAST'],
                [Blockly.Msg.LISTS_GET_INDEX_RANDOM, 'RANDOM']
            ];
        this.setHelpUrl(Blockly.Msg.LISTS_SET_INDEX_HELPURL);
        this.setColour(260);
        this.appendValueInput('LIST')
            .setCheck('Array')
            .appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_IN_LIST);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(MODE), 'MODE')
            .appendField('', 'SPACE');
        this.appendDummyInput('AT');
        this.appendValueInput('TO')
            .appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_TO);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_SET_INDEX_TOOLTIP);
        this.updateAt_(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var combo = thisBlock.getFieldValue('MODE') + '_' +
                thisBlock.getFieldValue('WHERE');
            return Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_' + combo];
        });
    },
    /**
     * Create XML to represent whether there is an 'AT' input.
     * @return {Array} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = [];
        var parameter = {};
        parameter.name = 'at';
        parameter.value = this.getInput('AT').type == Blockly.INPUT_VALUE;
        container.push(parameter);

        return container;
    },
    /**
     * Parse XML to restore the 'AT' input.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var elements = [].concat(xmlElement);
        for (var x = 0; x < elements.length; x++) {
            if (elements[x].name.toLowerCase() == 'at') {
                this.updateAt_(Blockly.Json.parseBoolean(elements[x].value));
            }
        }
    },
    /**
     * Create or delete an input for the numeric index.
     * @param {boolean} isAt True if the input should exist.
     * @private
     * @this Blockly.Block
     */
    updateAt_: function (isAt) {
        // Destroy old 'AT' and 'ORDINAL' input.
        this.removeInput('AT');
        this.removeInput('ORDINAL', true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT').setCheck('Number');
            if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
                this.appendDummyInput('ORDINAL')
                    .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
            }
        } else {
            this.appendDummyInput('AT');
        }
        var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function (value) {
            var newAt = (value == 'FROM_START') || (value == 'FROM_END');
            // The 'isAt' variable is available due to this function being a closure.
            if (newAt != isAt) {
                var block = this.sourceBlock_;
                block.updateAt_(newAt);
                // This menu has been destroyed and replaced.  Update the replacement.
                block.setFieldValue(value, 'WHERE');
                return null;
            }
            return undefined;
        });
        this.moveInputBefore('AT', 'TO');
        if (this.getInput('ORDINAL')) {
            this.moveInputBefore('ORDINAL', 'TO');
        }

        this.getInput('AT').appendField(menu, 'WHERE');
    }
};

Blockly.Blocks['lists_getSublist'] = {
    /**
     * Block for getting sublist.
     * @this Blockly.Block
     */
    init: function () {
        this.WHERE_OPTIONS_1 =
            [
                [Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_START, 'FROM_START'],
                [Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_END, 'FROM_END'],
                [Blockly.Msg.LISTS_GET_SUBLIST_START_FIRST, 'FIRST']
            ];
        this.WHERE_OPTIONS_2 =
            [
                [Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_START, 'FROM_START'],
                [Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_END, 'FROM_END'],
                [Blockly.Msg.LISTS_GET_SUBLIST_END_LAST, 'LAST']
            ];
        this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);
        this.setColour(260);
        this.appendValueInput('LIST')
            .setCheck('Array')
            .appendField(Blockly.Msg.LISTS_GET_SUBLIST_INPUT_IN_LIST);
        this.appendDummyInput('AT1');
        this.appendDummyInput('AT2');
        if (Blockly.Msg.LISTS_GET_SUBLIST_TAIL) {
            this.appendDummyInput('TAIL')
                .appendField(Blockly.Msg.LISTS_GET_SUBLIST_TAIL);
        }
        this.setInputsInline(true);
        this.setOutput(true, 'Array');
        this.updateAt_(1, true);
        this.updateAt_(2, true);
        this.setTooltip(Blockly.Msg.LISTS_GET_SUBLIST_TOOLTIP);
    },
    /**
     * Create XML to represent whether there are 'AT' inputs.
     * @return {Array} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = [];
        var parameter = {};
        parameter.name = 'at1';
        parameter.value = this.getInput('AT1').type == Blockly.INPUT_VALUE;
        container.push(parameter);

        parameter.name = 'at2';
        parameter.value = this.getInput('AT2').type == Blockly.INPUT_VALUE;
        container.push(parameter);

        return container;
    },
    /**
     * Parse XML to restore the 'AT' inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var elements = [].concat(xmlElement);
        for (var x = 0; x < elements.length; x++) {
            if (elements[x].name.toLowerCase() == 'at1') {
                this.updateAt_(1, Blockly.Json.parseBoolean(elements[x].value));
            }
            if (elements[x].name.toLowerCase() == 'at2') {
                this.updateAt_(2, Blockly.Json.parseBoolean(elements[x].value));
            }
        }
    },
    /**
     * Create or delete an input for a numeric index.
     * This block has two such inputs, independant of each other.
     * @param {number} n Specify first or second input (1 or 2).
     * @param {boolean} isAt True if the input should exist.
     * @private
     * @this Blockly.Block
     */
    updateAt_: function (n, isAt) {
        // Create or delete an input for the numeric index.
        // Destroy old 'AT' and 'ORDINAL' inputs.
        this.removeInput('AT' + n);
        this.removeInput('ORDINAL' + n, true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT' + n).setCheck('Number');
            if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
                this.appendDummyInput('ORDINAL' + n)
                    .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
            }
        } else {
            this.appendDummyInput('AT' + n);
        }
        var menu = new Blockly.FieldDropdown(this['WHERE_OPTIONS_' + n],
            function (value) {
                var newAt = (value == 'FROM_START') || (value == 'FROM_END');
                // The 'isAt' variable is available due to this function being a closure.
                if (newAt != isAt) {
                    var block = this.sourceBlock_;
                    block.updateAt_(n, newAt);
                    // This menu has been destroyed and replaced.  Update the replacement.
                    block.setFieldValue(value, 'WHERE' + n);
                    return null;
                }
                return undefined;
            });
        this.getInput('AT' + n)
            .appendField(menu, 'WHERE' + n);
        if (n == 1) {
            this.moveInputBefore('AT1', 'AT2');
            if (this.getInput('ORDINAL1')) {
                this.moveInputBefore('ORDINAL1', 'AT2');
            }
        }
        if (Blockly.Msg.LISTS_GET_SUBLIST_TAIL) {
            this.moveInputBefore('TAIL', null);
        }
    }
};

/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Logic blocks for Blockly.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

Blockly.Blocks.logic = {}


Blockly.Blocks['controls_if'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(210);
        this.appendValueInput('IF0')
            .setCheck('Boolean')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput('DO0')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['controls_if_elseif',
            'controls_if_else']));
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
            } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
            } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
            } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
            }
            return '';
        });
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    },
    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        if (!this.elseifCount_ && !this.elseCount_) {
            return null;
        }

        var container = [];
        if (this.elseifCount_) {
            var parameter = {};
            parameter.name = 'elseif';
            parameter.value = this.elseifCount_;
            container.push(parameter);
        }
        if (this.elseCount_) {
            var parameter = {};
            parameter.name = 'else';
            parameter.value = this.elseCount_;
            container.push(parameter);
        }
        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.arguments_ = [];
        var elements = [].concat(xmlElement);
        for (var x = 0; x < elements.length; x++) {
            if (elements[x].name.toLowerCase() == 'else') {
                this.elseCount_ = parseInt(elements[x].value, 10);
            }
            if (elements[x].name.toLowerCase() == 'elseif') {
                this.elseifCount_ = parseInt(elements[x].value, 10);
            }
        }
        for (var x = 1; x <= this.elseifCount_; x++) {
            this.appendValueInput('IF' + x)
                .setCheck('Boolean')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
            this.appendStatementInput('DO' + x)
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        }
        if (this.elseCount_) {
            this.appendStatementInput('ELSE')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        }
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = Blockly.Block.obtain(workspace, 'controls_if_if');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var x = 1; x <= this.elseifCount_; x++) {
            var elseifBlock = Blockly.Block.obtain(workspace, 'controls_if_elseif');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.elseCount_) {
            var elseBlock = Blockly.Block.obtain(workspace, 'controls_if_else');
            elseBlock.initSvg();
            connection.connect(elseBlock.previousConnection);
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        // Disconnect the else input blocks and remove the inputs.
        if (this.elseCount_) {
            this.removeInput('ELSE');
        }
        this.elseCount_ = 0;
        // Disconnect all the elseif input blocks and remove the inputs.
        for (var x = this.elseifCount_; x > 0; x--) {
            this.removeInput('IF' + x);
            this.removeInput('DO' + x);
        }
        this.elseifCount_ = 0;
        // Rebuild the block's optional inputs.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_elseif':
                    this.elseifCount_++;
                    var ifInput = this.appendValueInput('IF' + this.elseifCount_)
                        .setCheck('Boolean')
                        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
                    var doInput = this.appendStatementInput('DO' + this.elseifCount_);
                    doInput.appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
                    // Reconnect any child blocks.
                    if (clauseBlock.valueConnection_) {
                        ifInput.connection.connect(clauseBlock.valueConnection_);
                    }
                    if (clauseBlock.statementConnection_) {
                        doInput.connection.connect(clauseBlock.statementConnection_);
                    }
                    break;
                case 'controls_if_else':
                    this.elseCount_++;
                    var elseInput = this.appendStatementInput('ELSE');
                    elseInput.appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
                    // Reconnect any child blocks.
                    if (clauseBlock.statementConnection_) {
                        elseInput.connection.connect(clauseBlock.statementConnection_);
                    }
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        var x = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_elseif':
                    var inputIf = this.getInput('IF' + x);
                    var inputDo = this.getInput('DO' + x);
                    clauseBlock.valueConnection_ =
                        inputIf && inputIf.connection.targetConnection;
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    x++;
                    break;
                case 'controls_if_else':
                    var inputDo = this.getInput('ELSE');
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    }
};

Blockly.Blocks['controls_if_if'] = {
    /**
     * Mutator block for if container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(210);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['controls_if_elseif'] = {
    /**
     * Mutator bolck for else-if condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(210);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['controls_if_else'] = {
    /**
     * Mutator block for else condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(210);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE);
        this.setPreviousStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['logic_compare'] = {
    /**
     * Block for comparison operator.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS = Blockly.RTL ? [
            ['=', 'EQ'],
            ['\u2260', 'NEQ'],
            ['>', 'LT'],
            ['\u2265', 'LTE'],
            ['<', 'GT'],
            ['\u2264', 'GTE']
        ] : [
            ['=', 'EQ'],
            ['\u2260', 'NEQ'],
            ['<', 'LT'],
            ['\u2264', 'LTE'],
            ['>', 'GT'],
            ['\u2265', 'GTE']
        ];
        this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL);
        this.setColour(210);
        this.setOutput(true, 'Boolean');
        this.appendValueInput('A');
        this.appendValueInput('B')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                EQ: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,
                NEQ: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_NEQ,
                LT: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT,
                LTE: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LTE,
                GT: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,
                GTE: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GTE
            };
            return TOOLTIPS[op];
        });
    }
};

Blockly.Blocks['logic_operation'] = {
    /**
     * Block for logical operations: 'and', 'or'.
     * @this Blockly.Block
     */
    init: function () {
        this.OPERATORS =
            [
                [Blockly.Msg.LOGIC_OPERATION_AND, 'AND'],
                [Blockly.Msg.LOGIC_OPERATION_OR, 'OR']
            ];
        this.setHelpUrl(Blockly.Msg.LOGIC_OPERATION_HELPURL);
        this.setColour(210);
        this.setOutput(true, 'Boolean');
        this.appendValueInput('IN0')
            .setCheck('Boolean');
        this.appendValueInput('IN1')
            .setCheck('Boolean')
            .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP1');
        this.setInputsInline(true);
        this.setMutator(new Blockly.Mutator(['logic_compare_number']));
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('OP1');
            var TOOLTIPS = {
                AND: Blockly.Msg.LOGIC_OPERATION_TOOLTIP_AND,
                OR: Blockly.Msg.LOGIC_OPERATION_TOOLTIP_OR
            };
            return TOOLTIPS[op];
        });
    },
    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        if (!this.opCount_) {
            return null;
        }

        var container = [];
        if (this.opCount_) {
            var parameter = {};
            parameter.name = 'operators';
            parameter.value = this.opCount_;
            container.push(parameter);
        }
        return container;
    },
    domToMutation: function (xmlElement) {
        this.arguments_ = [];
        var elements = [].concat(xmlElement);
        for (var x = 0; x < elements.length; x++) {
            if (elements[x].name.toLowerCase() == 'operators') {
                this.opCount_ = parseInt(elements[x].value, 10);
            }

            for (var x = 1; x <= this.opCount_; x++) {
                this.appendValueInput('IN' + (x+1))
                    .setCheck('Boolean')
                    .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP' + (x+1));
            }
        }
    },
    decompose: function (workspace) {
        var containerBlock = Blockly.Block.obtain(workspace, 'logic_compare_base');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var x = 1; x <= this.opCount_; x++) {
            var numberBlock = Blockly.Block.obtain(workspace, 'logic_compare_number');
            numberBlock.initSvg();
            connection.connect(numberBlock.previousConnection);
            connection = numberBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        // this.opCount_ = 0;
        // Disconnect all the input blocks and remove the inputs.
        for (var x = this.opCount_; x > 0; x--) {
            this.removeInput('IN' + (x + 1));
            this.removeInput('OP' + (x + 1));
        }
        this.opCount_ = 0;
        // Rebuild the block's optional inputs.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'logic_compare_number':
                    this.opCount_++;

                    var ifInput = this.appendValueInput('IN' + (this.opCount_ + 1))
                        .setCheck('Boolean')
                        .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP' + (this.opCount_ + 1));

                    // Reconnect any child blocks.
                    if (clauseBlock.valueConnection_) {
                        ifInput.connection.connect(clauseBlock.valueConnection_);
                    }
                    if (clauseBlock.statementConnection_) {
                        doInput.connection.connect(clauseBlock.statementConnection_);
                    }
                    break;
                default:
                    console.log('Unknown block type ' + clauseBlock.type);
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        var x = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'logic_compare_number':
                    var inputIf = this.getInput('IN' + x);
                    var inputDo = this.getInput('OP' + x);
                    clauseBlock.valueConnection_ =
                        inputIf && inputIf.connection.targetConnection;
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    x++;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    }
};

Blockly.Blocks['logic_compare_base'] = {
    /**
     * Mutator block for compare container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(210);
        this.appendDummyInput()
            .appendField("Logic Compare");
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['logic_compare_number'] = {
    /**
     * Mutator block for additional numbers.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(210);
        this.appendDummyInput()
            .appendField("number");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("number tooltip");
        this.contextMenu = false;
    }
};

Blockly.Blocks['logic_negate'] = {
    /**
     * Block for negation.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.LOGIC_NEGATE_HELPURL);
        this.setColour(210);
        this.setOutput(true, 'Boolean');
        this.interpolateMsg(Blockly.Msg.LOGIC_NEGATE_TITLE,
            ['BOOL', 'Boolean', Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.Msg.LOGIC_NEGATE_TOOLTIP);
    }
};

Blockly.Blocks['logic_boolean'] = {
    /**
     * Block for boolean data type: true and false.
     * @this Blockly.Block
     */
    init: function () {
        var BOOLEANS =
            [
                [Blockly.Msg.LOGIC_BOOLEAN_TRUE, 'TRUE'],
                [Blockly.Msg.LOGIC_BOOLEAN_FALSE, 'FALSE']
            ];
        this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
        this.setColour(210);
        this.setOutput(true, 'Boolean');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(BOOLEANS), 'BOOL');
        this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
    }
};

Blockly.Blocks['logic_null'] = {
    /**
     * Block for null data type.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.LOGIC_NULL_HELPURL);
        this.setColour(210);
        this.setOutput(true);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LOGIC_NULL);
        this.setTooltip(Blockly.Msg.LOGIC_NULL_TOOLTIP);
    }
};

Blockly.Blocks['logic_ternary'] = {
    /**
     * Block for ternary operator.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.LOGIC_TERNARY_HELPURL);
        this.setColour(210);
        this.appendValueInput('IF')
            .setCheck('Boolean')
            .appendField(Blockly.Msg.LOGIC_TERNARY_CONDITION);
        this.appendValueInput('THEN')
            .appendField(Blockly.Msg.LOGIC_TERNARY_IF_TRUE);
        this.appendValueInput('ELSE')
            .appendField(Blockly.Msg.LOGIC_TERNARY_IF_FALSE);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.LOGIC_TERNARY_TOOLTIP);
    }
};

/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Loop blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Blocks.loops = {};

Blockly.Blocks['controls_repeat'] = {
    /**
     * Block for repeat n times (internal number).
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.CONTROLS_REPEAT_HELPURL);
        this.setColour(120);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT)
            .appendField(new Blockly.FieldTextInput('10',
                Blockly.FieldTextInput.nonnegativeIntegerValidator), 'TIMES')
            .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_TIMES);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_REPEAT_TOOLTIP);
    }
};

Blockly.Blocks['controls_repeat_ext'] = {
    /**
     * Block for repeat n times (external number).
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.CONTROLS_REPEAT_HELPURL);
        this.setColour(120);
        this.interpolateMsg(Blockly.Msg.CONTROLS_REPEAT_TITLE,
            ['TIMES', 'Number', Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.CONTROLS_REPEAT_TOOLTIP);
    }
};

Blockly.Blocks['controls_whileUntil'] = {
    /**
     * Block for 'do while/until' loop.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS =
            [
                [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_WHILE, 'WHILE'],
                [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, 'UNTIL']
            ];
        this.setHelpUrl(Blockly.Msg.CONTROLS_WHILEUNTIL_HELPURL);
        this.setColour(120);
        this.appendValueInput('BOOL')
            .setCheck('Boolean')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE');
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('MODE');
            var TOOLTIPS = {
                WHILE: Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
                UNTIL: Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
            };
            return TOOLTIPS[op];
        });
    }
};

Blockly.Blocks['controls_for'] = {
    /**
     * Block for 'for' loop.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.CONTROLS_FOR_HELPURL);
        this.setColour(120);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH)
            .appendField(new Blockly.FieldVariable(null), 'VAR');
        this.interpolateMsg(Blockly.Msg.CONTROLS_FOR_INPUT_FROM_TO_BY,
            ['FROM', 'Number', Blockly.ALIGN_RIGHT],
            ['TO', 'Number', Blockly.ALIGN_RIGHT],
            ['BY', 'Number', Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            return Blockly.Msg.CONTROLS_FOR_TOOLTIP.replace('%1',
                thisBlock.getFieldValue('VAR'));
        });
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    },
    /**
     * Add menu option to create getter block for loop variable.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function (options) {
        var option = {enabled: true};
        var name = this.getFieldValue('VAR');
        option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
        var xmlField = Ext.DomHelper.createDom({tag: "field", children: name})
        xmlField.setAttribute('name', 'VAR');
        var xmlBlock = Ext.DomHelper.createDom({tag: "block", children: xmlField})
        xmlBlock.setAttribute('type', 'variables_get');
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);
    }
};

Blockly.Blocks['controls_forEach'] = {
    /**
     * Block for 'for each' loop.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.CONTROLS_FOREACH_HELPURL);
        this.setColour(120);
        this.appendValueInput('LIST')
            .setCheck('Array')
            .appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_ITEM)
            .appendField(new Blockly.FieldVariable(null), 'VAR')
            .appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_INLIST);
        if (Blockly.Msg.CONTROLS_FOREACH_INPUT_INLIST_TAIL) {
            this.appendDummyInput()
                .appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_INLIST_TAIL);
            this.setInputsInline(true);
        }
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            return Blockly.Msg.CONTROLS_FOREACH_TOOLTIP.replace('%1',
                thisBlock.getFieldValue('VAR'));
        });
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    },
    customContextMenu: Blockly.Blocks['controls_for'].customContextMenu
};

Blockly.Blocks['controls_flow_statements'] = {
    /**
     * Block for flow statements: continue, break.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS =
            [
                [Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK, 'BREAK'],
                [Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE, 'CONTINUE']
            ];
        this.setHelpUrl(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_HELPURL);
        this.setColour(120);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'FLOW');
        this.setPreviousStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('FLOW');
            var TOOLTIPS = {
                BREAK: Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,
                CONTINUE: Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE
            };
            return TOOLTIPS[op];
        });
    },
    /**
     * Called whenever anything on the workspace changes.
     * Add warning if this flow block is not nested inside a loop.
     * @this Blockly.Block
     */
    onchange: function () {
        if (!this.workspace) {
            // Block has been deleted.
            return;
        }
        var legal = false;
        // Is the block nested in a control statement?
        var block = this;
        do {
            if (block.type == 'controls_repeat' ||
                block.type == 'controls_repeat_ext' ||
                block.type == 'controls_forEach' ||
                block.type == 'controls_for' ||
                block.type == 'controls_whileUntil') {
                legal = true;
                break;
            }
            block = block.getSurroundParent();
        } while (block);
        if (legal) {
            this.setWarningText(null);
        } else {
            this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING);
        }
    }
};

/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Math blocks for Blockly.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

Blockly.Blocks.math = {};


Blockly.Blocks['math_number'] = {
    /**
     * Block for numeric value.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
        this.setColour(230);
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('0',
                Blockly.FieldTextInput.numberValidator), 'NUM');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
    }
};

Blockly.Blocks['math_arithmetic'] = {
    /**
     * Block for basic arithmetic operator.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS =
            [
                [Blockly.Msg.MATH_ADDITION_SYMBOL, 'ADD'],
                [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, 'MINUS'],
                [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, 'MULTIPLY'],
                [Blockly.Msg.MATH_DIVISION_SYMBOL, 'DIVIDE'],
                [Blockly.Msg.MATH_POWER_SYMBOL, 'POWER']
            ];
        this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
        this.setColour(230);
        this.setOutput(true, 'Number');
        this.appendValueInput('A')
            .setCheck('Number');
        this.appendValueInput('B')
            .setCheck('Number')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                ADD: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
                MINUS: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
                MULTIPLY: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
                DIVIDE: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
                POWER: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
            };
            return TOOLTIPS[mode];
        });
    }
};

Blockly.Blocks['math_single'] = {
    /**
     * Block for advanced math operators with single operand.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS =
            [
                [Blockly.Msg.MATH_SINGLE_OP_ROOT, 'ROOT'],
                [Blockly.Msg.MATH_SINGLE_OP_ABSOLUTE, 'ABS'],
                ['-', 'NEG'],
                ['ln', 'LN'],
                ['log10', 'LOG10'],
                ['e^', 'EXP'],
                ['10^', 'POW10']
            ];
        this.setHelpUrl(Blockly.Msg.MATH_SINGLE_HELPURL);
        this.setColour(230);
        this.setOutput(true, 'Number');
        this.interpolateMsg('%1 %2',
            ['OP', new Blockly.FieldDropdown(OPERATORS)],
            ['NUM', 'Number', Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                ROOT: Blockly.Msg.MATH_SINGLE_TOOLTIP_ROOT,
                ABS: Blockly.Msg.MATH_SINGLE_TOOLTIP_ABS,
                NEG: Blockly.Msg.MATH_SINGLE_TOOLTIP_NEG,
                LN: Blockly.Msg.MATH_SINGLE_TOOLTIP_LN,
                LOG10: Blockly.Msg.MATH_SINGLE_TOOLTIP_LOG10,
                EXP: Blockly.Msg.MATH_SINGLE_TOOLTIP_EXP,
                POW10: Blockly.Msg.MATH_SINGLE_TOOLTIP_POW10
            };
            return TOOLTIPS[mode];
        });
    }
};

Blockly.Blocks['math_trig'] = {
    /**
     * Block for trigonometry operators.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS =
            [
                [Blockly.Msg.MATH_TRIG_SIN, 'SIN'],
                [Blockly.Msg.MATH_TRIG_COS, 'COS'],
                [Blockly.Msg.MATH_TRIG_TAN, 'TAN'],
                [Blockly.Msg.MATH_TRIG_ASIN, 'ASIN'],
                [Blockly.Msg.MATH_TRIG_ACOS, 'ACOS'],
                [Blockly.Msg.MATH_TRIG_ATAN, 'ATAN']
            ];
        this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
        this.setColour(230);
        this.setOutput(true, 'Number');
        this.appendValueInput('NUM')
            .setCheck('Number')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                SIN: Blockly.Msg.MATH_TRIG_TOOLTIP_SIN,
                COS: Blockly.Msg.MATH_TRIG_TOOLTIP_COS,
                TAN: Blockly.Msg.MATH_TRIG_TOOLTIP_TAN,
                ASIN: Blockly.Msg.MATH_TRIG_TOOLTIP_ASIN,
                ACOS: Blockly.Msg.MATH_TRIG_TOOLTIP_ACOS,
                ATAN: Blockly.Msg.MATH_TRIG_TOOLTIP_ATAN
            };
            return TOOLTIPS[mode];
        });
    }
};

Blockly.Blocks['math_constant'] = {
    /**
     * Block for constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
     * @this Blockly.Block
     */
    init: function () {
        var CONSTANTS =
            [
                ['\u03c0', 'PI'],
                ['e', 'E'],
                ['\u03c6', 'GOLDEN_RATIO'],
                ['sqrt(2)', 'SQRT2'],
                ['sqrt(\u00bd)', 'SQRT1_2'],
                ['\u221e', 'INFINITY']
            ];
        this.setHelpUrl(Blockly.Msg.MATH_CONSTANT_HELPURL);
        this.setColour(230);
        this.setOutput(true, 'Number');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(CONSTANTS), 'CONSTANT');
        this.setTooltip(Blockly.Msg.MATH_CONSTANT_TOOLTIP);
    }
};

Blockly.Blocks['math_number_property'] = {
    /**
     * Block for checking if a number is even, odd, prime, whole, positive,
     * negative or if it is divisible by certain number.
     * @this Blockly.Block
     */
    init: function () {
        var PROPERTIES =
            [
                [Blockly.Msg.MATH_IS_EVEN, 'EVEN'],
                [Blockly.Msg.MATH_IS_ODD, 'ODD'],
                [Blockly.Msg.MATH_IS_PRIME, 'PRIME'],
                [Blockly.Msg.MATH_IS_WHOLE, 'WHOLE'],
                [Blockly.Msg.MATH_IS_POSITIVE, 'POSITIVE'],
                [Blockly.Msg.MATH_IS_NEGATIVE, 'NEGATIVE'],
                [Blockly.Msg.MATH_IS_DIVISIBLE_BY, 'DIVISIBLE_BY']
            ];
        this.setColour(230);
        this.appendValueInput('NUMBER_TO_CHECK')
            .setCheck('Number');
        var dropdown = new Blockly.FieldDropdown(PROPERTIES, function (option) {
            var divisorInput = (option == 'DIVISIBLE_BY');
            this.sourceBlock_.updateShape_(divisorInput);
        });
        this.appendDummyInput()
            .appendField(dropdown, 'PROPERTY');
        this.setInputsInline(true);
        this.setOutput(true, 'Boolean');
        this.setTooltip(Blockly.Msg.MATH_IS_TOOLTIP);
    },
    /**
     * Create XML to represent whether the 'divisorInput' should be present.
     * @return {Array} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = [];
        var parameter = {};
        parameter.name = 'divisor_input';
        parameter.value = this.getFieldValue('PROPERTY') == 'DIVISIBLE_BY';
        container.push(parameter);

        return container;
    },
    /**
     * Parse XML to restore the 'divisorInput'.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var elements = [].concat(xmlElement);
        for (var x = 0; x < elements.length; x++) {
            if (elements[x].name.toLowerCase() == 'divisor_input') {
                this.updateShape_(Blockly.Json.parseBoolean(elements[x].value));
            }
        }
    },
    /**
     * Modify this block to have (or not have) an input for 'is divisible by'.
     * @param {boolean} divisorInput True if this block has a divisor input.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function (divisorInput) {
        // Add or remove a Value Input.
        var inputExists = this.getInput('DIVISOR');
        if (divisorInput) {
            if (!inputExists) {
                this.appendValueInput('DIVISOR')
                    .setCheck('Number');
            }
        } else if (inputExists) {
            this.removeInput('DIVISOR');
        }
    }
};

Blockly.Blocks['math_change'] = {
    /**
     * Block for adding to a variable in place.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_CHANGE_HELPURL);
        this.setColour(230);
        this.interpolateMsg(
            // TODO: Combine these messages instead of using concatenation.
                Blockly.Msg.MATH_CHANGE_TITLE_CHANGE + ' %1 ' +
                Blockly.Msg.MATH_CHANGE_INPUT_BY + ' %2',
            ['VAR', new Blockly.FieldVariable(Blockly.Msg.MATH_CHANGE_TITLE_ITEM)],
            ['DELTA', 'Number', Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace('%1',
                thisBlock.getFieldValue('VAR'));
        });
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    }
};

Blockly.Blocks['math_round'] = {
    /**
     * Block for rounding functions.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS =
            [
                [Blockly.Msg.MATH_ROUND_OPERATOR_ROUND, 'ROUND'],
                [Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDUP, 'ROUNDUP'],
                [Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDDOWN, 'ROUNDDOWN']
            ];
        this.setHelpUrl(Blockly.Msg.MATH_ROUND_HELPURL);
        this.setColour(230);
        this.setOutput(true, 'Number');
        this.appendValueInput('NUM')
            .setCheck('Number')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setTooltip(Blockly.Msg.MATH_ROUND_TOOLTIP);
    }
};

Blockly.Blocks['math_on_list'] = {
    /**
     * Block for evaluating a list of numbers to return sum, average, min, max,
     * etc.  Some functions also work on text (min, max, mode, median).
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS =
            [
                [Blockly.Msg.MATH_ONLIST_OPERATOR_SUM, 'SUM'],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_MIN, 'MIN'],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_MAX, 'MAX'],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_AVERAGE, 'AVERAGE'],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_MEDIAN, 'MEDIAN'],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_MODE, 'MODE'],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_STD_DEV, 'STD_DEV'],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_RANDOM, 'RANDOM']
            ];
        // Assign 'this' to a variable for use in the closure below.
        var thisBlock = this;
        this.setHelpUrl(Blockly.Msg.MATH_ONLIST_HELPURL);
        this.setColour(230);
        this.setOutput(true, 'Number');
        var dropdown = new Blockly.FieldDropdown(OPERATORS, function (newOp) {
            if (newOp == 'MODE') {
                thisBlock.outputConnection.setCheck('Array');
            } else {
                thisBlock.outputConnection.setCheck('Number');
            }
        });
        this.appendValueInput('LIST')
            .setCheck('Array')
            .appendField(dropdown, 'OP');
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                SUM: Blockly.Msg.MATH_ONLIST_TOOLTIP_SUM,
                MIN: Blockly.Msg.MATH_ONLIST_TOOLTIP_MIN,
                MAX: Blockly.Msg.MATH_ONLIST_TOOLTIP_MAX,
                AVERAGE: Blockly.Msg.MATH_ONLIST_TOOLTIP_AVERAGE,
                MEDIAN: Blockly.Msg.MATH_ONLIST_TOOLTIP_MEDIAN,
                MODE: Blockly.Msg.MATH_ONLIST_TOOLTIP_MODE,
                STD_DEV: Blockly.Msg.MATH_ONLIST_TOOLTIP_STD_DEV,
                RANDOM: Blockly.Msg.MATH_ONLIST_TOOLTIP_RANDOM
            };
            return TOOLTIPS[mode];
        });
    }
};

Blockly.Blocks['math_modulo'] = {
    /**
     * Block for remainder of a division.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_MODULO_HELPURL);
        this.setColour(230);
        this.setOutput(true, 'Number');
        this.interpolateMsg(Blockly.Msg.MATH_MODULO_TITLE,
            ['DIVIDEND', 'Number', Blockly.ALIGN_RIGHT],
            ['DIVISOR', 'Number', Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MATH_MODULO_TOOLTIP);
    }
};

Blockly.Blocks['math_constrain'] = {
    /**
     * Block for constraining a number between two limits.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_CONSTRAIN_HELPURL);
        this.setColour(230);
        this.setOutput(true, 'Number');
        this.interpolateMsg(Blockly.Msg.MATH_CONSTRAIN_TITLE,
            ['VALUE', 'Number', Blockly.ALIGN_RIGHT],
            ['LOW', 'Number', Blockly.ALIGN_RIGHT],
            ['HIGH', 'Number', Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT)
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MATH_CONSTRAIN_TOOLTIP);
    }
};

Blockly.Blocks['math_random_int'] = {
    /**
     * Block for random integer between [X] and [Y].
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_RANDOM_INT_HELPURL);
        this.setColour(230);
        this.setOutput(true, 'Number');
        this.interpolateMsg(Blockly.Msg.MATH_RANDOM_INT_TITLE,
            ['FROM', 'Number', Blockly.ALIGN_RIGHT],
            ['TO', 'Number', Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MATH_RANDOM_INT_TOOLTIP);
    }
};

Blockly.Blocks['math_random_float'] = {
    /**
     * Block for random fraction between 0 and 1.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_RANDOM_FLOAT_HELPURL);
        this.setColour(230);
        this.setOutput(true, 'Number');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MATH_RANDOM_FLOAT_TITLE_RANDOM);
        this.setTooltip(Blockly.Msg.MATH_RANDOM_FLOAT_TOOLTIP);
    }
};

/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Blocks.procedures = {};

Blockly.Blocks['procedures_defnoreturn'] = {
    /**
     * Block for defining a procedure with no return value.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
        this.setColour(290);
        var name = Blockly.Procedures.findLegalName(
            Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE, this);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE)
            .appendField(new Blockly.FieldTextInput(name,
                Blockly.Procedures.rename), 'NAME')
            .appendField('', 'PARAMS');
        this.appendStatementInput('STACK')
            .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
        this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
        this.arguments_ = [];
    },
    /**
     * Update the display of parameters for this procedure definition block.
     * Display a warning if there are duplicately named parameters.
     * @private
     * @this Blockly.Block
     */
    updateParams_: function () {
        // Check for duplicated arguments.
        var badArg = false;
        var hash = {};
        for (var x = 0; x < this.arguments_.length; x++) {
            if (hash['arg_' + this.arguments_[x].toLowerCase()]) {
                badArg = true;
                break;
            }
            hash['arg_' + this.arguments_[x].toLowerCase()] = true;
        }
        if (badArg) {
            this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING);
        } else {
            this.setWarningText(null);
        }
        // Merge the arguments into a human-readable list.
        var paramString = '';
        if (this.arguments_.length) {
            paramString = Blockly.Msg.PROCEDURES_BEFORE_PARAMS +
                ' ' + this.arguments_.join(', ');
        }
        this.setFieldValue(paramString, 'PARAMS');
    },
    /**
     * Create XML to represent the argument inputs.
     * @return {Array} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = [];
        for (var x = 0; x < this.arguments_.length; x++) {
            var parameter = {};
            parameter.name = 'arg';
            parameter.value = this.arguments_[x];
            container.push(parameter);
        }
        return container;
    },
    /**
     * Parse XML to restore the argument inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.arguments_ = [];
        var elements = [].concat(xmlElement);
        for (var x = 0; x < elements.length; x++) {
            if (elements[x].name.toLowerCase() == 'arg') {
                this.arguments_.push(elements[x].value);
            }
        }
        this.updateParams_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = Blockly.Block.obtain(workspace,
            'procedures_mutatorcontainer');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var x = 0; x < this.arguments_.length; x++) {
            var paramBlock = Blockly.Block.obtain(workspace, 'procedures_mutatorarg');
            paramBlock.initSvg();
            paramBlock.setFieldValue(this.arguments_[x], 'NAME');
            // Store the old location.
            paramBlock.oldLocation = x;
            connection.connect(paramBlock.previousConnection);
            connection = paramBlock.nextConnection;
        }
        // Initialize procedure's callers with blank IDs.
        Blockly.Procedures.mutateCallers(this.getFieldValue('NAME'),
            this.workspace, this.arguments_, null);
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        this.arguments_ = [];
        this.paramIds_ = [];
        var paramBlock = containerBlock.getInputTargetBlock('STACK');
        while (paramBlock) {
            this.arguments_.push(paramBlock.getFieldValue('NAME'));
            this.paramIds_.push(paramBlock.id);
            paramBlock = paramBlock.nextConnection &&
                paramBlock.nextConnection.targetBlock();
        }
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this.getFieldValue('NAME'),
            this.workspace, this.arguments_, this.paramIds_);
    },
    /**
     * Dispose of any callers.
     * @this Blockly.Block
     */
    dispose: function () {
        var name = this.getFieldValue('NAME');
        Blockly.Procedures.disposeCallers(name, this.workspace);
        // Call parent's destructor.
        Blockly.Block.prototype.dispose.apply(this, arguments);
    },
    /**
     * Return the signature of this procedure definition.
     * @return {!Array} Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES NOT have a return value.
     * @this Blockly.Block
     */
    getProcedureDef: function () {
        return [this.getFieldValue('NAME'), this.arguments_, false];
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    getVars: function () {
        return this.arguments_;
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function (oldName, newName) {
        var change = false;
        for (var x = 0; x < this.arguments_.length; x++) {
            if (Blockly.Names.equals(oldName, this.arguments_[x])) {
                this.arguments_[x] = newName;
                change = true;
            }
        }
        if (change) {
            this.updateParams_();
            // Update the mutator's variables if the mutator is open.
            if (this.mutator.isVisible_()) {
                var blocks = this.mutator.workspace_.getAllBlocks();
                for (var x = 0, block; block = blocks[x]; x++) {
                    if (block.type == 'procedures_mutatorarg' &&
                        Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
                        block.setFieldValue(newName, 'NAME');
                    }
                }
            }
        }
    },
    /**
     * Add custom menu options to this block's context menu.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function (options) {
        // Add option to create caller.
        var option = {enabled: true};
        var name = this.getFieldValue('NAME');
        option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);

        var xmlMutation = Ext.DomHelper.createDom({tag: "mutation"})
        xmlMutation.setAttribute('name', name);
        for (var x = 0; x < this.arguments_.length; x++) {
            var xmlArg = Ext.DomHelper.createDom({tag: "arg"})
            xmlArg.setAttribute('name', this.arguments_[x]);
            xmlMutation.appendChild(xmlArg);
        }
        var xmlBlock = Ext.DomHelper.createDom({tag: "block", children: xmlMutation})
        xmlBlock.setAttribute('type', this.callType_);
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);

        options.push(option);
        // Add options to create getters for each parameter.
        for (var x = 0; x < this.arguments_.length; x++) {
            var option = {enabled: true};
            var name = this.arguments_[x];
            option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
            var xmlField = Ext.DomHelper.createDom({tag: "field", children: name})
            xmlField.setAttribute('name', 'VAR');
            var xmlBlock = Ext.DomHelper.createDom({tag: "block", children: xmlField})
            xmlBlock.setAttribute('type', 'variables_get');
            option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
            options.push(option);
        }
    },
    callType_: 'procedures_callnoreturn'
};

Blockly.Blocks['procedures_defreturn'] = {
    /**
     * Block for defining a procedure with a return value.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL);
        this.setColour(290);
        var name = Blockly.Procedures.findLegalName(
            Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE, this);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_TITLE)
            .appendField(new Blockly.FieldTextInput(name,
                Blockly.Procedures.rename), 'NAME')
            .appendField('', 'PARAMS');
        this.appendStatementInput('STACK')
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_DO);
        this.appendValueInput('RETURN')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
        this.arguments_ = [];
    },
    updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
    mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
    decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
    compose: Blockly.Blocks['procedures_defnoreturn'].compose,
    dispose: Blockly.Blocks['procedures_defnoreturn'].dispose,
    /**
     * Return the signature of this procedure definition.
     * @return {!Array} Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES have a return value.
     * @this Blockly.Block
     */
    getProcedureDef: function () {
        return [this.getFieldValue('NAME'), this.arguments_, true];
    },
    getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
    renameVar: Blockly.Blocks['procedures_defnoreturn'].renameVar,
    customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
    callType_: 'procedures_callreturn'
};

Blockly.Blocks['procedures_mutatorcontainer'] = {
    /**
     * Mutator block for procedure container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(290);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['procedures_mutatorarg'] = {
    /**
     * Mutator block for procedure argument.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(290);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_MUTATORARG_TITLE)
            .appendField(new Blockly.FieldTextInput('x', this.validator_), 'NAME');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP);
        this.contextMenu = false;
    },
    /**
     * Obtain a valid name for the procedure.
     * Merge runs of whitespace.  Strip leading and trailing whitespace.
     * Beyond this, all names are legal.
     * @param {string} newVar User-supplied name.
     * @return {?string} Valid name, or null if a name was not specified.
     * @private
     * @this Blockly.Block
     */
    validator_: function (newVar) {
        newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
        return newVar || null;
    }
};

Blockly.Blocks['procedures_callnoreturn'] = {
    /**
     * Block for calling a procedure with no return value.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
        this.setColour(290);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_CALLNORETURN_CALL)
            .appendField('', 'NAME');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Tooltip is set in domToMutation.
        this.arguments_ = [];
        this.quarkConnections_ = null;
        this.quarkArguments_ = null;
    },
    /**
     * Returns the name of the procedure this block calls.
     * @return {string} Procedure name.
     * @this Blockly.Block
     */
    getProcedureCall: function () {
        // The NAME field is guaranteed to exist, null will never be returned.
        return /** @type {string} */ (this.getFieldValue('NAME'));
    },
    /**
     * Notification that a procedure is renaming.
     * If the name matches this block's procedure, rename it.
     * @param {string} oldName Previous name of procedure.
     * @param {string} newName Renamed procedure.
     * @this Blockly.Block
     */
    renameProcedure: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
            this.setFieldValue(newName, 'NAME');
            this.setTooltip(
                (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP
                    : Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP)
                    .replace('%1', newName));
        }
    },
    /**
     * Notification that the procedure's parameters have changed.
     * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
     * @param {!Array.<string>} paramIds IDs of params (consistent for each
     *     parameter through the life of a mutator, regardless of param renaming),
     *     e.g. ['piua', 'f8b_', 'oi.o'].
     * @this Blockly.Block
     */
    setProcedureParameters: function (paramNames, paramIds) {
        // Data structures:
        // this.arguments = ['x', 'y']
        //     Existing param names.
        // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
        //     Look-up of paramIds to connections plugged into the call block.
        // this.quarkArguments_ = ['piua', 'f8b_']
        //     Existing param IDs.
        // Note that quarkConnections_ may include IDs that no longer exist, but
        // which might reappear if a param is reattached in the mutator.
        if (!paramIds) {
            // Reset the quarks (a mutator is about to open).
            this.quarkConnections_ = {};
            this.quarkArguments_ = null;
            return;
        }
        if (paramIds.length != paramNames.length) {
            throw 'Error: paramNames and paramIds must be the same length.';
        }
        if (!this.quarkArguments_) {
            // Initialize tracking for this block.
            this.quarkConnections_ = {};
            if (paramNames.join('\n') == this.arguments_.join('\n')) {
                // No change to the parameters, allow quarkConnections_ to be
                // populated with the existing connections.
                this.quarkArguments_ = paramIds;
            } else {
                this.quarkArguments_ = [];
            }
        }
        // Switch off rendering while the block is rebuilt.
        var savedRendered = this.rendered;
        this.rendered = false;
        // Update the quarkConnections_ with existing connections.
        for (var x = this.arguments_.length - 1; x >= 0; x--) {
            var input = this.getInput('ARG' + x);
            if (input) {
                var connection = input.connection.targetConnection;
                this.quarkConnections_[this.quarkArguments_[x]] = connection;
                // Disconnect all argument blocks and remove all inputs.
                this.removeInput('ARG' + x);
            }
        }
        // Rebuild the block's arguments.
        this.arguments_ = [].concat(paramNames);
        this.quarkArguments_ = paramIds;
        for (var x = 0; x < this.arguments_.length; x++) {
            var input = this.appendValueInput('ARG' + x)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(this.arguments_[x]);
            if (this.quarkArguments_) {
                // Reconnect any child blocks.
                var quarkName = this.quarkArguments_[x];
                if (quarkName in this.quarkConnections_) {
                    var connection = this.quarkConnections_[quarkName];
                    if (!connection || connection.targetConnection ||
                        connection.sourceBlock_.workspace != this.workspace) {
                        // Block no longer exists or has been attached elsewhere.
                        delete this.quarkConnections_[quarkName];
                    } else {
                        input.connection.connect(connection);
                    }
                }
            }
        }
        // Restore rendering and show the changes.
        this.rendered = savedRendered;
        if (this.rendered) {
            this.render();
        }
    },
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {Array} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = [];
        for (var x = 0; x < this.arguments_.length; x++) {
            var parameter = {};
            parameter.name = 'arg';
            parameter.value = this.arguments_[x];
            container.push(parameter);
        }

        return container;
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.arguments_ = [];
        var elements = [].concat(xmlElement);
        for (var x = 0; x < elements.length; x++) {
            if (elements[x].name.toLowerCase() == 'arg') {
                this.arguments_.push(elements[x].value);
            }
        }

        var name = xmlElement.getAttribute('name');
        this.setFieldValue(name, 'NAME');
        this.setTooltip(
            (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP
                : Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).replace('%1', name));
        var def = Blockly.Procedures.getDefinition(name, this.workspace);
        if (def && def.mutator.isVisible()) {
            // Initialize caller with the mutator's IDs.
            this.setProcedureParameters(def.arguments_, def.paramIds_);
        } else {
            this.arguments_ = [];
            for (var x = 0, childNode; childNode = xmlElement.childNodes[x]; x++) {
                if (childNode.nodeName.toLowerCase() == 'arg') {
                    this.arguments_.push(childNode.getAttribute('name'));
                }
            }
            // For the second argument (paramIds) use the arguments list as a dummy
            // list.
            this.setProcedureParameters(this.arguments_, this.arguments_);
        }
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function (oldName, newName) {
        for (var x = 0; x < this.arguments_.length; x++) {
            if (Blockly.Names.equals(oldName, this.arguments_[x])) {
                this.arguments_[x] = newName;
                this.getInput('ARG' + x).fieldRow[0].setText(newName);
            }
        }
    },
    /**
     * Add menu option to find the definition block for this call.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function (options) {
        var option = {enabled: true};
        option.text = Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;
        var name = this.getProcedureCall();
        var workspace = this.workspace;
        option.callback = function () {
            var def = Blockly.Procedures.getDefinition(name, workspace);
            def && def.select();
        };
        options.push(option);
    }
};

Blockly.Blocks['procedures_callreturn'] = {
    /**
     * Block for calling a procedure with a return value.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLRETURN_HELPURL);
        this.setColour(290);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_CALLRETURN_CALL)
            .appendField('', 'NAME');
        this.setOutput(true);
        // Tooltip is set in domToMutation.
        this.arguments_ = [];
        this.quarkConnections_ = null;
        this.quarkArguments_ = null;
    },
    getProcedureCall: Blockly.Blocks['procedures_callnoreturn'].getProcedureCall,
    renameProcedure: Blockly.Blocks['procedures_callnoreturn'].renameProcedure,
    setProcedureParameters: Blockly.Blocks['procedures_callnoreturn'].setProcedureParameters,
    mutationToDom: Blockly.Blocks['procedures_callnoreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_callnoreturn'].domToMutation,
    renameVar: Blockly.Blocks['procedures_callnoreturn'].renameVar,
    customContextMenu: Blockly.Blocks['procedures_callnoreturn'].customContextMenu
};

Blockly.Blocks['procedures_ifreturn'] = {
    /**
     * Block for conditionally returning a value from a procedure.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl('http://c2.com/cgi/wiki?GuardClause');
        this.setColour(290);
        this.appendValueInput('CONDITION')
            .setCheck('Boolean')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendValueInput('VALUE')
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_IFRETURN_TOOLTIP);
        this.hasReturnValue_ = true;
    },
    /**
     * Create XML to represent whether this block has a return value.
     * @return {Array} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = [];
        var parameter = {};
        parameter.name = 'arg';
        parameter.value = Number(this.hasReturnValue_);
        container.push(parameter);

        return container;
    },
    /**
     * Parse XML to restore whether this block has a return value.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.arguments_ = [];
        var elements = [].concat(xmlElement);
        for (var x = 0; x < elements.length; x++) {
            if (elements[x].name.toLowerCase() == 'value') {
                this.hasReturnValue_ = (elements[x].value == 1);
                if (!this.hasReturnValue_) {
                    this.removeInput('VALUE');
                    this.appendDummyInput('VALUE')
                        .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
                }
            }
        }
    },
    /**
     * Called whenever anything on the workspace changes.
     * Add warning if this flow block is not nested inside a loop.
     * @this Blockly.Block
     */
    onchange: function () {
        if (!this.workspace) {
            // Block has been deleted.
            return;
        }
        var legal = false;
        // Is the block nested in a procedure?
        var block = this;
        do {
            if (block.type == 'procedures_defnoreturn' ||
                block.type == 'procedures_defreturn') {
                legal = true;
                break;
            }
            block = block.getSurroundParent();
        } while (block);
        if (legal) {
            // If needed, toggle whether this block has a return value.
            if (block.type == 'procedures_defnoreturn' && this.hasReturnValue_) {
                this.removeInput('VALUE');
                this.appendDummyInput('VALUE')
                    .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
                this.hasReturnValue_ = false;
            } else if (block.type == 'procedures_defreturn' && !this.hasReturnValue_) {
                this.removeInput('VALUE');
                this.appendValueInput('VALUE')
                    .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
                this.hasReturnValue_ = true;
            }
            this.setWarningText(null);
        } else {
            this.setWarningText(Blockly.Msg.PROCEDURES_IFRETURN_WARNING);
        }
    }
};

/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Blocks.text = {};


Blockly.Blocks['text'] = {
    /**
     * Block for text value.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
        this.setColour(160);
        this.appendDummyInput()
            .appendField(this.newQuote_(true))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(this.newQuote_(false));
        this.setOutput(true, 'String');
        this.setTooltip(Blockly.Msg.TEXT_TEXT_TOOLTIP);
    },
    /**
     * Create an image of an open or closed quote.
     * @param {boolean} open True if open quote, false if closed.
     * @return {!Blockly.FieldImage} The field image of the quote.
     * @private
     */
    newQuote_: function (open) {
        if (open == Blockly.RTL) {
            var file = 'quote1.png';
        } else {
            var file = 'quote0.png';
        }
        return new Blockly.FieldImage(Blockly.pathToBlockly + 'media/' + file,
            12, 12, '"');
    }
};

Blockly.Blocks['text_join'] = {
    /**
     * Block for creating a string made up of any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
        this.setColour(160);
        this.appendValueInput('ADD0')
            .appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH);
        this.appendValueInput('ADD1');
        this.setOutput(true, 'String');
        this.setMutator(new Blockly.Mutator(['text_create_join_item']));
        this.setTooltip(Blockly.Msg.TEXT_JOIN_TOOLTIP);
        this.itemCount_ = 2;
    },
    /**
     * Create XML to represent number of text inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the text inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        for (var x = 0; x < this.itemCount_; x++) {
            this.removeInput('ADD' + x);
        }

        var elements = [].concat(xmlElement);
        for (var x = 0; x < elements.length; x++) {
            if (elements[x].name.toLowerCase() == 'items') {
                this.itemCount_ = parseInt(elements[x].value, 10);
            }
        }

        for (var x = 0; x < this.itemCount_; x++) {
            var input = this.appendValueInput('ADD' + x);
            if (x == 0) {
                input.appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH);
            }
        }
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                    'media/quote0.png', 12, 12, '"'))
                .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                    'media/quote1.png', 12, 12, '"'));
        }
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = Blockly.Block.obtain(workspace,
            'text_create_join_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var x = 0; x < this.itemCount_; x++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'text_create_join_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        // Disconnect all input blocks and remove all inputs.
        if (this.itemCount_ == 0) {
            this.removeInput('EMPTY');
        } else {
            for (var x = this.itemCount_ - 1; x >= 0; x--) {
                this.removeInput('ADD' + x);
            }
        }
        this.itemCount_ = 0;
        // Rebuild the block's inputs.
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        while (itemBlock) {
            var input = this.appendValueInput('ADD' + this.itemCount_);
            if (this.itemCount_ == 0) {
                input.appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH);
            }
            // Reconnect any child blocks.
            if (itemBlock.valueConnection_) {
                input.connection.connect(itemBlock.valueConnection_);
            }
            this.itemCount_++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                    'media/quote0.png', 12, 12, '"'))
                .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                    'media/quote1.png', 12, 12, '"'));
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var x = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + x);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            x++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    }
};

Blockly.Blocks['text_create_join_container'] = {
    /**
     * Mutator block for container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(160);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TEXT_CREATE_JOIN_TITLE_JOIN);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['text_create_join_item'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(160);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TITLE_ITEM);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['text_append'] = {
    /**
     * Block for appending to a variable in place.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.TEXT_APPEND_HELPURL);
        this.setColour(160);
        this.appendValueInput('TEXT')
            .appendField(Blockly.Msg.TEXT_APPEND_TO)
            .appendField(new Blockly.FieldVariable(
                Blockly.Msg.TEXT_APPEND_VARIABLE), 'VAR')
            .appendField(Blockly.Msg.TEXT_APPEND_APPENDTEXT);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            return Blockly.Msg.TEXT_APPEND_TOOLTIP.replace('%1',
                thisBlock.getFieldValue('VAR'));
        });
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    }
};

Blockly.Blocks['text_length'] = {
    /**
     * Block for string length.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.TEXT_LENGTH_HELPURL);
        this.setColour(160);
        this.interpolateMsg(Blockly.Msg.TEXT_LENGTH_TITLE,
            ['VALUE', ['String', 'Array'], Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.TEXT_LENGTH_TOOLTIP);
    }
};

Blockly.Blocks['text_isEmpty'] = {
    /**
     * Block for is the string null?
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.TEXT_ISEMPTY_HELPURL);
        this.setColour(160);
        this.interpolateMsg(Blockly.Msg.TEXT_ISEMPTY_TITLE,
            ['VALUE', ['String', 'Array'], Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
        this.setOutput(true, 'Boolean');
        this.setTooltip(Blockly.Msg.TEXT_ISEMPTY_TOOLTIP);
    }
};

Blockly.Blocks['text_indexOf'] = {
    /**
     * Block for finding a substring in the text.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS =
            [
                [Blockly.Msg.TEXT_INDEXOF_OPERATOR_FIRST, 'FIRST'],
                [Blockly.Msg.TEXT_INDEXOF_OPERATOR_LAST, 'LAST']
            ];
        this.setHelpUrl(Blockly.Msg.TEXT_INDEXOF_HELPURL);
        this.setColour(160);
        this.setOutput(true, 'Number');
        this.appendValueInput('VALUE')
            .setCheck('String')
            .appendField(Blockly.Msg.TEXT_INDEXOF_INPUT_INTEXT);
        this.appendValueInput('FIND')
            .setCheck('String')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'END');
        if (Blockly.Msg.TEXT_INDEXOF_TAIL) {
            this.appendDummyInput().appendField(Blockly.Msg.TEXT_INDEXOF_TAIL);
        }
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.TEXT_INDEXOF_TOOLTIP);
    }
};

Blockly.Blocks['text_charAt'] = {
    /**
     * Block for getting a character from the string.
     * @this Blockly.Block
     */
    init: function () {
        this.WHERE_OPTIONS =
            [
                [Blockly.Msg.TEXT_CHARAT_FROM_START, 'FROM_START'],
                [Blockly.Msg.TEXT_CHARAT_FROM_END, 'FROM_END'],
                [Blockly.Msg.TEXT_CHARAT_FIRST, 'FIRST'],
                [Blockly.Msg.TEXT_CHARAT_LAST, 'LAST'],
                [Blockly.Msg.TEXT_CHARAT_RANDOM, 'RANDOM']
            ];
        this.setHelpUrl(Blockly.Msg.TEXT_CHARAT_HELPURL);
        this.setColour(160);
        this.setOutput(true, 'String');
        this.appendValueInput('VALUE')
            .setCheck('String')
            .appendField(Blockly.Msg.TEXT_CHARAT_INPUT_INTEXT);
        this.appendDummyInput('AT');
        this.setInputsInline(true);
        this.updateAt_(true);
        this.setTooltip(Blockly.Msg.TEXT_CHARAT_TOOLTIP);
    },
    /**
     * Create XML to represent whether there is an 'AT' input.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
        container.setAttribute('at', isAt);
        return container;
    },
    /**
     * Parse XML to restore the 'AT' input.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var elements = [].concat(xmlElement);
        for (var x = 0; x < elements.length; x++) {
            if (elements[x].name.toLowerCase() == 'at') {
                this.updateAt_(Blockly.Json.parseBoolean(elements[x].value));
            }
        }
    },
    /**
     * Create or delete an input for the numeric index.
     * @param {boolean} isAt True if the input should exist.
     * @private
     * @this Blockly.Block
     */
    updateAt_: function (isAt) {
        // Destroy old 'AT' and 'ORDINAL' inputs.
        this.removeInput('AT');
        this.removeInput('ORDINAL', true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT').setCheck('Number');
            if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
                this.appendDummyInput('ORDINAL')
                    .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
            }
        } else {
            this.appendDummyInput('AT');
        }
        if (Blockly.Msg.TEXT_CHARAT_TAIL) {
            this.removeInput('TAIL', true);
            this.appendDummyInput('TAIL')
                .appendField(Blockly.Msg.TEXT_CHARAT_TAIL);
        }
        var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function (value) {
            var newAt = (value == 'FROM_START') || (value == 'FROM_END');
            // The 'isAt' variable is available due to this function being a closure.
            if (newAt != isAt) {
                var block = this.sourceBlock_;
                block.updateAt_(newAt);
                // This menu has been destroyed and replaced.  Update the replacement.
                block.setFieldValue(value, 'WHERE');
                return null;
            }
            return undefined;
        });
        this.getInput('AT').appendField(menu, 'WHERE');
    }
};

Blockly.Blocks['text_getSubstring'] = {
    /**
     * Block for getting substring.
     * @this Blockly.Block
     */
    init: function () {
        this.WHERE_OPTIONS_1 =
            [
                [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_START, 'FROM_START'],
                [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_END, 'FROM_END'],
                [Blockly.Msg.TEXT_GET_SUBSTRING_START_FIRST, 'FIRST']
            ];
        this.WHERE_OPTIONS_2 =
            [
                [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_START, 'FROM_START'],
                [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_END, 'FROM_END'],
                [Blockly.Msg.TEXT_GET_SUBSTRING_END_LAST, 'LAST']
            ];
        this.setHelpUrl(Blockly.Msg.TEXT_GET_SUBSTRING_HELPURL);
        this.setColour(160);
        this.appendValueInput('STRING')
            .setCheck('String')
            .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_INPUT_IN_TEXT);
        this.appendDummyInput('AT1');
        this.appendDummyInput('AT2');
        if (Blockly.Msg.TEXT_GET_SUBSTRING_TAIL) {
            this.appendDummyInput('TAIL')
                .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
        }
        this.setInputsInline(true);
        this.setOutput(true, 'String');
        this.updateAt_(1, true);
        this.updateAt_(2, true);
        this.setTooltip(Blockly.Msg.TEXT_GET_SUBSTRING_TOOLTIP);
    },
    /**
     * Create XML to represent whether there are 'AT' inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var isAt1 = this.getInput('AT1').type == Blockly.INPUT_VALUE;
        container.setAttribute('at1', isAt1);
        var isAt2 = this.getInput('AT2').type == Blockly.INPUT_VALUE;
        container.setAttribute('at2', isAt2);
        return container;
    },
    /**
     * Parse XML to restore the 'AT' inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var isAt1 = (xmlElement.getAttribute('at1') == 'true');
        var isAt2 = (xmlElement.getAttribute('at2') == 'true');
        this.updateAt_(1, isAt1);
        this.updateAt_(2, isAt2);
    },
    /**
     * Create or delete an input for a numeric index.
     * This block has two such inputs, independant of each other.
     * @param {number} n Specify first or second input (1 or 2).
     * @param {boolean} isAt True if the input should exist.
     * @private
     * @this Blockly.Block
     */
    updateAt_: function (n, isAt) {
        // Create or delete an input for the numeric index.
        // Destroy old 'AT' and 'ORDINAL' inputs.
        this.removeInput('AT' + n);
        this.removeInput('ORDINAL' + n, true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT' + n).setCheck('Number');
            if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
                this.appendDummyInput('ORDINAL' + n)
                    .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
            }
        } else {
            this.appendDummyInput('AT' + n);
        }
        // Move tail, if present, to end of block.
        if (n == 2 && Blockly.Msg.TEXT_GET_SUBSTRING_TAIL) {
            this.removeInput('TAIL', true);
            this.appendDummyInput('TAIL')
                .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
        }
        var menu = new Blockly.FieldDropdown(this['WHERE_OPTIONS_' + n],
            function (value) {
                var newAt = (value == 'FROM_START') || (value == 'FROM_END');
                // The 'isAt' variable is available due to this function being a closure.
                if (newAt != isAt) {
                    var block = this.sourceBlock_;
                    block.updateAt_(n, newAt);
                    // This menu has been destroyed and replaced.  Update the replacement.
                    block.setFieldValue(value, 'WHERE' + n);
                    return null;
                }
                return undefined;
            });
        this.getInput('AT' + n)
            .appendField(menu, 'WHERE' + n);
        if (n == 1) {
            this.moveInputBefore('AT1', 'AT2');
        }
    }
};

Blockly.Blocks['text_changeCase'] = {
    /**
     * Block for changing capitalization.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS =
            [
                [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_UPPERCASE, 'UPPERCASE'],
                [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_LOWERCASE, 'LOWERCASE'],
                [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_TITLECASE, 'TITLECASE']
            ];
        this.setHelpUrl(Blockly.Msg.TEXT_CHANGECASE_HELPURL);
        this.setColour(160);
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'CASE');
        this.setOutput(true, 'String');
        this.setTooltip(Blockly.Msg.TEXT_CHANGECASE_TOOLTIP);
    }
};

Blockly.Blocks['text_trim'] = {
    /**
     * Block for trimming spaces.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS =
            [
                [Blockly.Msg.TEXT_TRIM_OPERATOR_BOTH, 'BOTH'],
                [Blockly.Msg.TEXT_TRIM_OPERATOR_LEFT, 'LEFT'],
                [Blockly.Msg.TEXT_TRIM_OPERATOR_RIGHT, 'RIGHT']
            ];
        this.setHelpUrl(Blockly.Msg.TEXT_TRIM_HELPURL);
        this.setColour(160);
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE');
        this.setOutput(true, 'String');
        this.setTooltip(Blockly.Msg.TEXT_TRIM_TOOLTIP);
    }
};

Blockly.Blocks['text_print'] = {
    /**
     * Block for print statement.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.TEXT_PRINT_HELPURL);
        this.setColour(160);
        this.interpolateMsg(Blockly.Msg.TEXT_PRINT_TITLE,
            ['TEXT', null, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
    }
};

Blockly.Blocks['text_prompt'] = {
    /**
     * Block for prompt function.
     * @this Blockly.Block
     */
    init: function () {
        var TYPES =
            [
                [Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, 'TEXT'],
                [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, 'NUMBER']
            ];
        // Assign 'this' to a variable for use in the closure below.
        var thisBlock = this;
        this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
        this.setColour(160);
        var dropdown = new Blockly.FieldDropdown(TYPES, function (newOp) {
            if (newOp == 'NUMBER') {
                thisBlock.changeOutput('Number');
            } else {
                thisBlock.changeOutput('String');
            }
        });
        this.appendDummyInput()
            .appendField(dropdown, 'TYPE')
            .appendField(this.newQuote_(true))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(this.newQuote_(false));
        this.setOutput(true, 'String');
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            return (thisBlock.getFieldValue('TYPE') == 'TEXT') ?
                Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT :
                Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER;
        });
    },
    newQuote_: Blockly.Blocks['text'].newQuote_
};

/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Variable blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Blocks.variables = {};


Blockly.Blocks['variables_get'] = {
    /**
     * Block for variable getter.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
        this.setColour(330);
        this.appendDummyInput()
            .appendField(Blockly.Msg.VARIABLES_GET_TITLE)
            .appendField(new Blockly.FieldVariable(
                Blockly.Msg.VARIABLES_GET_ITEM), 'VAR')
            .appendField(Blockly.Msg.VARIABLES_GET_TAIL);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
        this.contextMenuType_ = 'variables_set';
    },
    /**
     * Return all variables referenced by this block.
     * @param {string} varType Type of variable. Uses field name.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    getVars: function (varType) {
        if(varType == null)
            return [this.getFieldValue('VAR')];
        return [this.getFieldValue(varType)];
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} varType Type of variable. Uses field name.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function (varType, oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue(varType))) {
            this.setFieldValue(newName, varType);
        }
    },
    /**
     * Add menu option to create getter/setter block for this setter/getter.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function (options) {
        var option = {enabled: true};
        var name = this.getFieldValue('VAR');
        option.text = this.contextMenuMsg_.replace('%1', name);
        var xmlField = Ext.DomHelper.createDom({tag: "field", children: name})
        xmlField.setAttribute('name', 'VAR');
        var xmlBlock = Ext.DomHelper.createDom({tag: "block", children: xmlField})
        xmlBlock.setAttribute('type', this.contextMenuType_);
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);
    }
};

Blockly.Blocks['variables_set'] = {
    /**
     * Block for variable setter.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);
        this.setColour(330);
        this.interpolateMsg(
            // TODO: Combine these messages instead of using concatenation.
                Blockly.Msg.VARIABLES_SET_TITLE + ' %1 ' +
                Blockly.Msg.VARIABLES_SET_TAIL + ' %2',
            ['VAR', new Blockly.FieldVariable(Blockly.Msg.VARIABLES_SET_ITEM)],
            ['VALUE', null, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
        this.contextMenuType_ = 'variables_get';
    },
    /**
     * Return all variables referenced by this block.
     * @param {string} varType Type of variable. Uses field name.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    getVars: function (varType) {
        return [this.getFieldValue(varType)];
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} varType Type of variable. Uses field name.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function (varType, oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue(varType))) {
            this.setFieldValue(newName, varType);
        }
    },
    customContextMenu: Blockly.Blocks['variables_get'].customContextMenu
};
