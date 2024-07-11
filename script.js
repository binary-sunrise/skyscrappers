
    // Cesium access token
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNDk2NzEzNC1jNzliLTRjYmMtYjAyYS03ZGMwZmQ1NmM3Y2IiLCJpZCI6MTcyNDgzLCJpYXQiOjE2OTc2MTIxNTF9.vtKKVar2g6PONdhY5CNmmDoRUnISxNLCSLZcV9F0YTQ';
    
    // Initialize the viewer with Cesium World Terrain.
    const viewer = new Cesium.Viewer('cesiumContainer', {
      terrain: Cesium.Terrain.fromWorldTerrain(),
      // globe: false,
    });
  // try {
  //   const tileset = await Cesium.createGooglePhotorealistic3DTileset();
  //   viewer.scene.primitives.add(tileset);
  // } catch (error) {
  //   console.log(`Failed to load tileset: ${error}`);
  // }

    // Fly the camera to Denver, Colorado at the given longitude, latitude, and height.
    // viewer.camera.flyTo({
    //   destination: Cesium.Cartesian3.fromDegrees(-104.9965, 39.74248, 4000)
    // });

    // Add Cesium OSM Buildings.
    const buildingsTileset = await Cesium.createOsmBuildingsAsync();
    viewer.scene.primitives.add(buildingsTileset);


    // STEP 3 CODE
    async function addBuildingGeoJSON() {
      // Load the GeoJSON file from Cesium ion.
      const geoJSONURL = await Cesium.IonResource.fromAssetId(2402160);
      // Create the geometry from the GeoJSON, and clamp it to the ground.
      const geoJSON = await Cesium.GeoJsonDataSource.load(geoJSONURL, { clampToGround: true });
      // Add it to the scene.
      const dataSource = await viewer.dataSources.add(geoJSON);
      // By default, polygons in CesiumJS will be draped over all 3D content in the scene.
      // Modify the polygons so that this draping only applies to the terrain, not 3D buildings.
      for (const entity of dataSource.entities.values) {
        entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
      }
      // // Move the camera so that the polygon is in view.
      // viewer.flyTo(dataSource);
    }
    addBuildingGeoJSON();

    // STEP 4 CODE
// Hide individual buildings in this area using 3D Tiles Styling language.
    buildingsTileset.style = new Cesium.Cesium3DTileStyle({
      // Create a style rule to control each building's "show" property.
      show: {
        conditions : [
          // Any building that has this elementId will have `show = false`.
          // ['${elementId} === 137425129', false],
          // ['${elementId} === 265932618', false],
          // ['${elementId} === 137425142', false],
          // ['${elementId} === 137425129', false],
          // ['${elementId} === 137425131', false],
          // ['${elementId} === 10872054', false],
          // ['${elementId} === 137425127', false],
          // ['${elementId} === 265260827', false],
          // ['${elementId} === 265260949', false],

          ['${name} === "Empire State Building" ', false], //hide empirestate
          ['${name} === "上海环球金融中心" ', false], //hide shanghai Tower
          ['${elementId} === 7584462', false], // hide burj Khalifa
          ['${name} === "Merdeka 118" ', false], //hide merdeka 118
          ['${name} === "118 Mall" ', false], //hide merdeka 118
          ['${elementId} === 261504064', false], // hide steinway_tower
          ['${name} === "Chrysler Building" ', false], //hide Chrysler Building
          
          


          // If a building does not have one of these elementIds, set `show = true`.
          [true, true]
        ]
      },
      // Set the default color style for this particular 3D Tileset.
      // For any building that has a `cesium#color` property, use that color, otherwise make it white.
      color: "Boolean(${feature['cesium#color']}) ? color(${feature['cesium#color']}) : color('#ffffff')"
    });

    // STEP 6 CODE
    // Add the 3D Tileset you created from your Cesium ion account.
    const newBuildingTileset = await Cesium.Cesium3DTileset.fromIonAssetId(2402176);
    viewer.scene.primitives.add(newBuildingTileset);




    //-------------Empire state Building------------//


    const empireState = await Cesium.Cesium3DTileset.fromIonAssetId(2407725);
    viewer.scene.primitives.add(empireState);

    // Toggle empire state
    document.querySelector('#toggle-empireState').onclick = function() {
      empireState.show = !empireState.show;
    };

    //zoom to empire state
    document.querySelector('#zoomto-empireState').onclick = function() {
      viewer.flyTo(empireState,12);
    };

    //--------------shanghai Tower----------------//


    const shanghaiTower = await Cesium.Cesium3DTileset.fromIonAssetId(2407842);
    viewer.scene.primitives.add(shanghaiTower);

    // Toggle shanghai Tower
    document.querySelector('#toggle-shanghaiTower').onclick = function() {
      shanghaiTower.show = !shanghaiTower.show;
    };

    //zoom to shanghai Tower
    document.querySelector('#zoomto-shanghaiTower').onclick = function() {
      viewer.flyTo(shanghaiTower,12);
    };

    //----------------Burj Khalifa------------------//

    const burjKhalifa = await Cesium.Cesium3DTileset.fromIonAssetId(2407888);
    viewer.scene.primitives.add(burjKhalifa);

    // Toggle Burj Khalifa
    document.querySelector('#toggle-burjKhalifa').onclick = function() {
      burjKhalifa.show = !burjKhalifa.show;
    };

    //zoom to Burj Khalifa
    document.querySelector('#zoomto-burjKhalifa').onclick = function() {
      viewer.flyTo(burjKhalifa,12);
    };

    //----------------merdeka_118------------------//

    const merdeka_118 = await Cesium.Cesium3DTileset.fromIonAssetId(2408034);
    viewer.scene.primitives.add(merdeka_118);

    // Toggle merdeka_118
    document.querySelector('#toggle-merdeka_118').onclick = function() {
      merdeka_118.show = !merdeka_118.show;
    };

    //zoom to merdeka_118
    document.querySelector('#zoomto-merdeka_118').onclick = function() {
      viewer.flyTo(merdeka_118,12);
    };
    
    //----------------steinway_tower------------------//

    const steinway_tower = await Cesium.Cesium3DTileset.fromIonAssetId(2409899);
    viewer.scene.primitives.add(steinway_tower);

    // Toggle steinway_tower
    document.querySelector('#toggle-steinway_tower').onclick = function() {
      steinway_tower.show = !steinway_tower.show;
    };

    //zoom to steinway_tower
    document.querySelector('#zoomto-steinway_tower').onclick = function() {
      viewer.flyTo(steinway_tower,12);
    };

    //----------------chrysler building------------------//

    const chrysler_building = await Cesium.Cesium3DTileset.fromIonAssetId(2409908);
    viewer.scene.primitives.add(chrysler_building);

    // Toggle chrysler building
    document.querySelector('#toggle-chrysler_building').onclick = function() {
      chrysler_building.show = !chrysler_building.show;
    };

    //zoom to chrysler building
    document.querySelector('#zoomto-chrysler_building').onclick = function() {
      viewer.flyTo(chrysler_building,12);
    };

    //----------------guangzhou finance centre------------------//

    const guangzhou_finance_centre = await Cesium.Cesium3DTileset.fromIonAssetId(2409913);
    viewer.scene.primitives.add(guangzhou_finance_centre);

    // Toggle guangzhou finance centre
    document.querySelector('#toggle-guangzhou_finance_centre').onclick = function() {
      guangzhou_finance_centre.show = !guangzhou_finance_centre.show;
    };

    //zoom to guangzhou finance centre
    document.querySelector('#zoomto-guangzhou_finance_centre').onclick = function() {
      viewer.flyTo(guangzhou_finance_centre,12);
    };
    










