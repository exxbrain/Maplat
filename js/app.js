require(["jquery", "ol3", "tps", "histmap", "bootstrap"], function($, ol, tps) {//"css!bootstrapcss", "css!ol3css"], function($, ol, tps) {
    console.log("app");

    // スマホタッチで中間ズームを許す
    ol.interaction.PinchZoom.handleUpEvent_ = function(mapBrowserEvent) {
        if (this.targetPointers.length < 2) {
            var map = mapBrowserEvent.map;
            var view = map.getView();
            view.setHint(ol.ViewHint.INTERACTING, -1);
            //var resolution = view.getResolution();
            // Zoom to final resolution, with an animation, and provide a
            // direction not to zoom out/in if user was pinching in/out.
            // Direction is > 0 if pinching out, and < 0 if pinching in.
            //var direction = this.lastScaleDelta_ - 1;
            //ol.interaction.Interaction.zoom(map, view, resolution,
            //    this.anchor_, this.duration_, direction);
            return false;
        } else {
            return true;
        }
    };


    var histMapSource = new ol.source.histMap({
        attributions: [
            new ol.Attribution({
                html: '奈良市鳥瞰図 (1868年以降) Cartography Associates CC-BY-NC-SA 3.0'
            })
        ],
        mapID: 'NaraOldMap1'
    });

    console.log(histMapSource.getMapID());

    var histMapLayer = new ol.layer.Tile({
        source: histMapSource
    });

    var histmap = new ol.Map({
        layers: [
            histMapLayer
        ],
        target: 'histmap',
        //controls: ol.control.defaults({
        //    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
        //        collapsible: false
        //    })
        //}),
        view: new ol.View({
            //center: [-25860000, 4130000],
            center: [-20037508, 20037508],
            //center: [0,0],
            //rotation: Math.PI / 6,
            zoom: 2
        })
    });

    var nowmap = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'nowmap',
        view: new ol.View({
            center: [0, 0],
            zoom: 2,
            rotation: 1
        })
    });

    $(".year_change").on( 'click', function () {
        var year = $(this).data('year');
        console.log(year);
        changeYear(year);
    } );
    changeYear(2015);
    function changeYear(year) {
        if (year == 2015) {
            $("#nowmapcontainer").show();
            $("#histmapcontainer").hide();
            nowmap.updateSize();
            nowmap.renderSync();
        } else {
            $("#histmapcontainer").show();
            $("#nowmapcontainer").hide();
            histmap.updateSize();
            histmap.renderSync();
        }
    }

    //年スライダー関連
    /*$("#slider").on( 'input', function () {
        changeYear();
    } );
    $("#slider").val(2015);
    changeYear();
    function changeYear() {
        console.log();
        var year = $("#slider").val();
        $("#year").text(year);
        if (year >= 1868) {
            $("#nowmapcontainer").show();
            $("#histmapcontainer").hide();
            nowmap.updateSize();
            nowmap.renderSync();
        } else {
            $("#histmapcontainer").show();
            $("#nowmapcontainer").hide();
            histmap.updateSize();
            histmap.renderSync();
        }
    }*/
});