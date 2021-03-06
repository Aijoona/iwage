Ext.ns('iwage.image.tools');

Ext.define('iwage.image.tools.Zoom', {
    mode: iwage.MODES.IMAGE,
    toolLabel: 'Zoom',
    extend: 'iwage.tools.Static',
    buttons: [
        {
            text: 'Tama&ntilde;o orignal',
            icon: iwage.icon('search'),
            handler: function () {
                iwage().view.setZoom(100);

                this.getComponent().down('#zoom').setValue(100);
            }
        }
    ],
    createControls: function () {
        var tool = this;

        return [
            {
                xtype: 'slider',
                fieldLabel: 'Nivel',
                itemId: 'zoom',
                width: 250,
                value: iwage().view.getZoom(),
                minValue: 0,
                maxValue: 250,
                useTips: true,
                tipText: function (thumb) {
                    return Ext.String.format('x{0}', (thumb.value / 100).toFixed(2));
                },
                listeners: {
                    change: function () {
                        tool.refresh();
                    }
                }
            }
        ];
    },
    refresh: function (options) {
        var values = this.getValues();

        if (!values) {
            return;
        }

        iwage().view.setZoom(values.zoom);
    },
    constructor: function (options) {
        var self = this;

        // TODO remover el evento
        iwage.on('app:zoom', function (zoom) {
            self.getComponent().down('#zoom').setValue(zoom);
        });

        this.callParent(arguments);
    },
    applyTool: function () {
    },
    destroy: function () {
        this.callParent(arguments);
    }
});