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


Ext.define('openHAB.automation.ruleList', {
    extend: 'Ext.panel.Panel',
    layout: 'fit',
    icon: 'images/application-list.png',
    items: [],

    initComponent: function () {
        this.title = language.rule_ListTitle;

        var me = this;

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    icon: 'images/minus-button.png',
                    itemId: 'delete',
                    text: language.delete,
                    cls: 'x-btn-icon',
                    disabled: true,
                    tooltip: language.rule_ListDeleteTip,
                    handler: function () {
                        // Get the item name to delete
                        var record = ruleList.getSelectionModel().getSelection()[0];
                        if (record == null)
                            return;

                        // Make sure we really want to do this!!!
                        var ruleName = record.get('name');
                        Ext.Msg.show({
                            title: language.rule_ListConfirmDeleteTitle,
                            msg: sprintf(language.rule_ListConfirmDeleteMsg, ruleName),
                            buttons: Ext.Msg.YESNO,
                            config: {
                                obj: this,
                                name: ruleName,
                                id: record.get('id')
                            },
                            fn: deleteRule,
                            icon: Ext.MessageBox.QUESTION
                        });
                    }
                },
                {
                    icon: 'images/plus-button.png',
                    itemId: 'add',
                    text: language.add,
                    cls: 'x-btn-icon',
                    disabled: false,
                    tooltip: language.rule_ListAddTip,
                    handler: function () {
                        var ruleDesigner = Ext.create('openHAB.automation.ruleProperties', {
                            blockly: {
                                blocks: {
                                    block: [
                                        {
                                            type: 'openhab_rule',
                                            deletable: false,
                                            movable: false,
                                            fields: [
                                                {name: "NAME", value: language.rule_DesignerNewRule}
                                            ]
                                        }
                                    ]
                                }
                            }
                        });

                        if (ruleDesigner == null)
                            return;

                        Ext.getCmp('automationPropertyContainer').setNewProperty(ruleDesigner);
                    }
                }
            ]
        });

        var ruleList = Ext.create('Ext.grid.Panel', {
            store: designStore,
            header: false,
            split: true,
            tbar: toolbar,
            collapsible: false,
            multiSelect: false,
            columns: [
                {
                    flex: 1,
                    dataIndex: 'name'
                }
            ],
            listeners: {
                itemclick: function (grid, record) {
                    if (record == null)
                        return;

                    Ext.Ajax.request({
                        url: HABminBaseURL + "/config/designer/" + record.get("id"),
                        headers: {'Accept': 'application/json'},
                        method: 'GET',
                        success: function (response, opts) {
                            var json = Ext.decode(response.responseText);
                            if(json == null)
                                return;
                            var ruleDesigner = Ext.create('openHAB.automation.ruleProperties', {
                                ruleId: json.id,
                                blockly: {
                                    blocks: json
                                }
                            });

                            if (ruleDesigner == null)
                                return;

                            Ext.getCmp('automationPropertyContainer').setNewProperty(ruleDesigner);
                        },
                        failure: function (result, request) {
                            handleStatusNotification(NOTIFICATION_ERROR,
                                sprintf(language.rule_ListGetError, options.config.name));
                        },
                        callback: function (options, success, response) {
                            // Enable toolbar
                            toolbar.getComponent('delete').enable();
                        }
                    });


                }
            }
        });

        this.items = ruleList;

        this.callParent();


        function deleteRule(button, text, options) {
            if (button !== 'yes')
                return;

            // Tell OH to Remove the item
            Ext.Ajax.request({
                url: HABminBaseURL + "/config/designer/" + options.config.id,
                headers: {'Accept': 'application/json'},
                method: 'DELETE',
                success: function (response, opts) {
                    handleStatusNotification(NOTIFICATION_OK,
                        sprintf(language.rule_ListDeleteOk, options.config.name));
                },
                failure: function (result, request) {
                    handleStatusNotification(NOTIFICATION_ERROR,
                        sprintf(language.rule_ListDeleteError, options.config.name));
                },
                callback: function (options, success, response) {
                    // Reload the store
                    designStore.reload();

                    // Disable delete
                    toolbar.getComponent('delete').disable();

                    // Clear the design
                    Ext.getCmp('automationPropertyContainer').removeProperty();
                }
            });
        }
    }
})
;