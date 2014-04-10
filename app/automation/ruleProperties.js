/**
 * HABmin - the openHAB admin interface
 *
 * openHAB, the open Home Automation Bus.
 * Copyright (C) 2010-2013, openHAB.org <admin@openhab.org>
 *
 * See the contributors.txt file in the distribution for a
 * full listing of individual contributors.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see <http://www.gnu.org/licenses>.
 *
 * Additional permission under GNU GPL version 3 section 7
 *
 * If you modify this Program, or any covered work, by linking or
 * combining it with Eclipse (or a modified version of that library),
 * containing parts covered by the terms of the Eclipse Public License
 * (EPL), the licensors of this Program grant you additional permission
 * to convey the resulting work.
 */

/**
 * OpenHAB Admin Console HABmin
 *
 * @author Chris Jackson
 */


Ext.define('openHAB.automation.ruleProperties', {
    extend:'Ext.ux.blockly.Blockly',
    tabTip:'Rule Properties',
    header:false,
    border:false,
    autoDestroy: true,

    initComponent:function () {
        var ruleTriggerTypeArray = [
            {id: 0, label: 'Item command was received ...'},
            {id: 1, label: 'Item state was updated ...'},
            {id: 1, label: 'Item state changed from ...'},
            {id: 2, label: 'The openHAB system has ...'},
            {id: 3, label: 'The time is ...'},
            {id: 4, label: 'A periodic timer running ...'}
        ];

        var ruleTriggerParameterArray = [
            {type: 0, label: ''},
            {type: 1, label: ''},
            {type: 2, label: 'Started', value: 'started'},
            {type: 2, label: 'Shutdown', value: 'shutdown'},
            {type: 3, label: 'Midnight', value: 'midnight'},
            {type: 3, label: 'Midday', value: 'noon'},
            {type: 4, label: 'every day at midnight', value: 'cron ""'},
            {type: 4, label: 'every 5 seconds', value: 'cron "*/5 * * * * ?"'},
            {type: 4, label: 'every 10 seconds', value: 'cron "*/10 * * * * ?"'},
            {type: 4, label: 'every 15 seconds', value: 'cron "*/15 * * * * ?"'},
            {type: 4, label: 'every 20 seconds', value: 'cron "*/20 * * * * ?"'},
            {type: 4, label: 'every 30 seconds', value: 'cron "*/30 * * * * ?"'},
            {type: 4, label: 'every 1 minute', value: 'cron "0 * * * * ?"'},
            {type: 4, label: 'every 2 minutes', value: 'cron "0 */2 * * * ?"'},
            {type: 4, label: 'every 3 minutes', value: 'cron "0 */3 * * * ?"'},
            {type: 4, label: 'every 5 minutes', value: 'cron "0 */5 * * * ?"'},
            {type: 4, label: 'every 10 minutes', value: 'cron "0 */10 * * * ?"'},
            {type: 4, label: 'every 15 minutes', value: 'cron "0 */15 * * * ?"'},
            {type: 4, label: 'every 20 minutes', value: 'cron "0 */20 * * * ?"'},
            {type: 4, label: 'every 30 minutes', value: 'cron "0 */30 * * * ?"'},
            {type: 4, label: 'every 1 hour', value: 'cron "0 0 * * * ?"'},
            {type: 4, label: 'every 2 hours', value: 'cron "0 0 */2 * * ?"'},
            {type: 4, label: 'every 3 hours', value: 'cron "0 0 */3 * * ?"'},
            {type: 4, label: 'every 4 hours', value: 'cron "0 0 */4 * * ?"'},
            {type: 4, label: 'every 6 hours', value: 'cron "0 0 */6 * * ?"'},
            {type: 4, label: 'every 8 hours', value: 'cron "0 0 */8 * * ?"'},
            {type: 4, label: 'every 12 hours', value: 'cron "0 0 */12 * * ?"'},
            {type: 4, label: 'every day', value: 'cron "0 0 0 * * ?"'},
            {type: 4, label: 'every 2 days', value: 'cron "0 0 0 */2 * ?"'},
            {type: 4, label: 'every 3 days', value: 'cron "0 0 0 */3 * ?"'},
            {type: 4, label: 'every 4 days', value: 'cron "0 0 0 */4 * ?"'},
            {type: 4, label: 'every 5 days', value: 'cron "0 0 0 */5 * ?"'},
            {type: 4, label: 'every 7 days', value: 'cron "0 0 0 */7 * ?"'},
            {type: 4, label: 'every 10 days', value: 'cron "0 0 0 */10 * ?"'},
            {type: 4, label: 'every 1 month', value: 'cron "0 0 0 0 * ?"'}
        ];

        var ruleTriggerTypeStore = Ext.create('Ext.data.Store', {
            storeId:'ruleTriggerType',
            fields:[
                {type:'number', name:'id'},
                {type:'text', name:'label'}
            ]
        });
        ruleTriggerTypeStore.loadData(ruleTriggerTypeArray);

        var categoryArray = [
            {name: "Logic", title: language.rule_DrawToolboxLogic, icon: "images/sum.png"},
            {name: "Loops", title: language.rule_DrawToolboxLoops, icon: "images/edit-indent.png"},
            {name: "Math", title: language.rule_DrawToolboxMath, icon: "images/edit-mathematics.png"},
            {name: "Items", title: language.rule_DrawToolboxItems, icon: "images/edit-list.png"},
            {name: "Functions", title: language.rule_DrawToolboxFunctions, icon: "images/edit-code.png"},
            {name: "Library", title: language.rule_DrawToolboxLibrary, icon: "images/book-open.png"}
        ];
        var toolArray = [
            {category: "Logic", block: "<xml><block type='controls_if'></block></xml>"},
            {category: "Logic", block: "<xml><block type='logic_compare'></block></xml>"},
            {category: "Logic", block: "<xml><block type='logic_operation'></block></xml>"},
            {category: "Logic", block: "<xml><block type='logic_negate'></block></xml>"},
            {category: "Logic", block: "<xml><block type='logic_boolean'></block></xml>"},
            {category: "Logic", block: "<xml><block type='logic_ternary'></block></xml>"},
            {category: "Loops", block: "<xml><block type='controls_whileUntil'></block></xml>"},
            {category: "Loops", block: "<xml><block type='controls_repeat_ext'></block></xml>"},
            {category: "Loops", block: "<xml><block type='controls_for'></block></xml>"},
            {category: "Loops", block: "<xml><block type='controls_forEach'></block></xml>"},
            {category: "Loops", block: "<xml><block type='controls_flow_statements'></block></xml>"},
            {category: "Math", block: "<xml><block type='math_number'></block></xml>"},
            {category: "Math", block: "<xml><block type='math_arithmetic'></block></xml>"},
            {category: "Math", block: "<xml><block type='math_single'></block></xml>"},
            {category: "Math", block: "<xml><block type='math_trig'></block></xml>"},
            {category: "Math", block: "<xml><block type='math_constant'></block></xml>"},
            {category: "Math", block: "<xml><block type='math_number_property'></block></xml>"},
            {category: "Math", block: "<xml><block type='math_change'></block></xml>"},
            {category: "Math", block: "<xml><block type='math_round'></block></xml>"},
            {category: "Math", block: "<xml><block type='math_modulo'></block></xml>"},
            {category: "Math", block: "<xml><block type='math_constrain'></block></xml>"},
            {category: "Math", block: "<xml><block type='math_random_int'></block></xml>"},
            {category: "Items", block: "<xml><block type='variables_set'></block></xml>"},
            {category: "Items", block: "<xml><block type='variables_get'></block></xml>"},
            {category: "Items", block: "<xml><block type='persistence_get'></block></xml>"},
            {category: "Functions", block: "<xml><block type='procedures_ifreturn'></block></xml>"}
        ];

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    icon: 'images/cross.png',
                    itemId: 'cancel',
                    text: language.cancel,
                    cls: 'x-btn-icon',
                    disabled: true,
                    tooltip: language.rule_DrawCancelTip,
                    handler: function () {
                    }
                },
                {
                    icon: 'images/disk.png',
                    itemId: 'save',
                    text: language.save,
                    cls: 'x-btn-icon',
                    disabled: true,
                    tooltip: language.rule_DrawSaveTip,
                    handler: function () {
                    }
                }
            ]
        });

        this.tbar = toolbar;
        if(this.blockly == null)
            this.blockly = {};

        this.blockly.toolbox = true;
        this.blockly.collapse = true;
        this.blockly.toolboxCategories = categoryArray;
        this.blockly.toolboxTools = toolArray;
        this.blockly.trashcan = true;
        this.blockly.path = 'js/extux/blockly/';

        this.callParent();
    }
})
;