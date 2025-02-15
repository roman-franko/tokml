import { describe, it, expect } from "vitest";
import { toKML, foldersToKML } from "../lib/index";

describe("foldersToKML", () => {
  it("#foldersToKML", () => {
    expect(
      foldersToKML({
        type: "root",
        children: [
          {
            type: "Feature",
            properties: {
              foo: "bar",
            },

            geometry: {
              type: "Point",
              coordinates: [0, 2],
            },
          },

          {
            type: "folder",
            meta: { name: "Hi", id: "f00" },
            children: [],
          },

          {
            type: "folder",
            meta: { name: "Hi" },
            children: [
              {
                type: "Feature",
                properties: {
                  foo: "bar",
                },

                geometry: {
                  type: "LineString",
                  coordinates: [
                    [0, 2],
                    [1, 2],
                  ],
                },
              },
            ],
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>
      <Placemark>
      <ExtendedData>
        <Data name=\\"foo\\"><value>bar</value></Data></ExtendedData>
        <Point><coordinates>0,2</coordinates></Point></Placemark>
      <Folder id=\\"f00\\">
      <name>Hi</name>
        </Folder>
      <Folder>
      <name>Hi</name>
        
      <Placemark>
      <ExtendedData>
        <Data name=\\"foo\\"><value>bar</value></Data></ExtendedData>
        <LineString><coordinates>0,2
      1,2</coordinates></LineString></Placemark></Folder></Document></kml>"
    `);
    expect(
      foldersToKML({
        type: "root",
        children: [
          {
            type: "Feature",
            properties: {
              foo: "bar",
            },

            geometry: {
              type: "Point",
              coordinates: [0, 2],
            },
          },

          {
            type: "Feature",
            properties: {
              foo: "bar",
            },

            geometry: {
              type: "LineString",
              coordinates: [
                [0, 2],
                [1, 2],
              ],
            },
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>
      <Placemark>
      <ExtendedData>
        <Data name=\\"foo\\"><value>bar</value></Data></ExtendedData>
        <Point><coordinates>0,2</coordinates></Point></Placemark>
      <Placemark>
      <ExtendedData>
        <Data name=\\"foo\\"><value>bar</value></Data></ExtendedData>
        <LineString><coordinates>0,2
      1,2</coordinates></LineString></Placemark></Document></kml>"
    `);
  });
});

describe("toKML", () => {
  it("#toKML", () => {
    expect(
      toKML({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              foo: "bar",
            },

            geometry: {
              type: "Point",
              coordinates: [0, 2],
            },
          },

          {
            type: "Feature",
            properties: {
              foo: "bar",
            },

            geometry: {
              type: "MultiPoint",
              coordinates: [
                [0, 2],
                [1, 2],
              ],
            },
          },

          {
            type: "Feature",
            properties: {
              foo: "bar",
            },

            geometry: {
              type: "LineString",
              coordinates: [
                [0, 2],
                [1, 2],
              ],
            },
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>
      <Placemark>
      <ExtendedData>
        <Data name=\\"foo\\"><value>bar</value></Data></ExtendedData>
        <Point><coordinates>0,2</coordinates></Point></Placemark>
      <Placemark>
      <ExtendedData>
        <Data name=\\"foo\\"><value>bar</value></Data></ExtendedData>
        <MultiGeometry>
      <Point><coordinates>0,2</coordinates></Point>
      <Point><coordinates>1,2</coordinates></Point></MultiGeometry></Placemark>
      <Placemark>
      <ExtendedData>
        <Data name=\\"foo\\"><value>bar</value></Data></ExtendedData>
        <LineString><coordinates>0,2
      1,2</coordinates></LineString></Placemark></Document></kml>"
    `);

    expect(
      toKML({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              foo: "bar",
            },

            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [0, 2],
                  [1, 2],
                  [2, 2],
                  [0, 2],
                ],

                [
                  [0, 3],
                  [1, 3],
                  [2, 3],
                  [0, 3],
                ],
              ],
            },
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>
      <Placemark>
      <ExtendedData>
        <Data name=\\"foo\\"><value>bar</value></Data></ExtendedData>
        <Polygon>
      <outerBoundaryIs>
        <LinearRing><coordinates>0,2
      1,2
      2,2
      0,2</coordinates></LinearRing></outerBoundaryIs>
      <innerBoundaryIs>
        <LinearRing><coordinates>0,3
      1,3
      2,3
      0,3</coordinates></LinearRing></innerBoundaryIs></Polygon></Placemark></Document></kml>"
    `);

    expect(
      toKML({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              foo: "bar",
            },

            geometry: {
              type: "MultiLineString",
              coordinates: [
                [
                  [0, 2],
                  [1, 2],
                  [2, 2],
                  [0, 2],
                ],

                [
                  [0, 3],
                  [1, 3],
                  [2, 3],
                  [0, 3],
                ],
              ],
            },
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>
      <Placemark>
      <ExtendedData>
        <Data name=\\"foo\\"><value>bar</value></Data></ExtendedData>
        <MultiGeometry>
      <LineString><coordinates>0,2
      1,2
      2,2
      0,2</coordinates></LineString>
      <LineString><coordinates>0,3
      1,3
      2,3
      0,3</coordinates></LineString></MultiGeometry></Placemark></Document></kml>"
    `);

    expect(
      toKML({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              foo: "bar",
            },

            geometry: {
              type: "MultiPolygon",
              coordinates: [
                [
                  [
                    [0, 2],
                    [1, 2],
                    [2, 2],
                    [0, 2],
                  ],

                  [
                    [0, 3],
                    [1, 3],
                    [2, 3],
                    [0, 3],
                  ],
                ],
              ],
            },
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>
      <Placemark>
      <ExtendedData>
        <Data name=\\"foo\\"><value>bar</value></Data></ExtendedData>
        <MultiGeometry>
      <Polygon>
      <outerBoundaryIs>
        <LinearRing><coordinates>0,2
      1,2
      2,2
      0,2</coordinates></LinearRing></outerBoundaryIs>
      <innerBoundaryIs>
        <LinearRing><coordinates>0,3
      1,3
      2,3
      0,3</coordinates></LinearRing></innerBoundaryIs></Polygon></MultiGeometry></Placemark></Document></kml>"
    `);

    expect(
      toKML({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              foo: "bar",
              bar: { x: 1 },
              q: 1,
            },

            geometry: {
              type: "GeometryCollection",
              geometries: [{ type: "Point", coordinates: [0, 1] }],
            },
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>
      <Placemark>
      <ExtendedData>
        <Data name=\\"foo\\"><value>bar</value></Data>
        <Data name=\\"bar\\"><value>{\\"x\\":1}</value></Data>
        <Data name=\\"q\\"><value>1</value></Data></ExtendedData>
        <MultiGeometry>
      <Point><coordinates>0,1</coordinates></Point></MultiGeometry></Placemark></Document></kml>"
    `);

    expect(
      toKML({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: null,
            geometry: { type: "Point", coordinates: [0, 1] },
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>
      <Placemark>

        <Point><coordinates>0,1</coordinates></Point></Placemark></Document></kml>"
    `);

    expect(
      toKML({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              description: "test",
            },

            geometry: { type: "Point", coordinates: [0, 1] },
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>
      <Placemark>
      <description>test</description><ExtendedData></ExtendedData>
        <Point><coordinates>0,1</coordinates></Point></Placemark></Document></kml>"
    `);

    expect(
      toKML({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              name: "bar",
            },

            geometry: null,
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>
      <Placemark>
      <name>bar</name><ExtendedData></ExtendedData>
        </Placemark></Document></kml>"
    `);

    expect(
      toKML({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              name: "bar",
            },

            geometry: { type: "Point", coordinates: [0, 1] },
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>
      <Placemark>
      <name>bar</name><ExtendedData></ExtendedData>
        <Point><coordinates>0,1</coordinates></Point></Placemark></Document></kml>"
    `);
  });

  it("ignores coordinates past #2", () => {
    expect(
      toKML({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              name: "bar",
            },

            geometry: { type: "Point", coordinates: [0, 1, 2] },
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>
      <Placemark>
      <name>bar</name><ExtendedData></ExtendedData>
        <Point><coordinates>0,1</coordinates></Point></Placemark></Document></kml>"
    `);
  });

  it("includes feature id", () => {
    expect(
      toKML({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            id: 42,
            properties: {
              name: "bar",
            },
            geometry: { type: "Point", coordinates: [0, 1] },
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>
      <Placemark id=\\"42\\">
      <name>bar</name><ExtendedData></ExtendedData>
        <Point><coordinates>0,1</coordinates></Point></Placemark></Document></kml>"
    `);
  });

  it("json values", () => {
    expect(
      toKML({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            id: 42,
            properties: {
              name: { x: "bar" },
            },

            geometry: { type: "Point", coordinates: [0, 1] },
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>
      <Placemark id=\\"42\\">
      <name>{\\"x\\":\\"bar\\"}</name><ExtendedData></ExtendedData>
        <Point><coordinates>0,1</coordinates></Point></Placemark></Document></kml>"
    `);
  });

  it("visibility", () => {
    expect(
      toKML({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              visibility: false,
            },

            geometry: { type: "Point", coordinates: [0, 1] },
          },

          {
            type: "Feature",
            properties: {
              visibility: true,
            },

            geometry: { type: "Point", coordinates: [0, 1] },
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>
      <Placemark>
      <visibility>0</visibility><ExtendedData></ExtendedData>
        <Point><coordinates>0,1</coordinates></Point></Placemark>
      <Placemark>
      <visibility>1</visibility><ExtendedData></ExtendedData>
        <Point><coordinates>0,1</coordinates></Point></Placemark></Document></kml>"
    `);
  });

  it("html values", () => {
    expect(
      toKML({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            id: 42,
            properties: {
              name: "bar",
              description: { "@type": "html", value: "<b>bar</b>" },
            },

            geometry: { type: "Point", coordinates: [0, 1] },
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document>
      <Placemark id=\\"42\\">
      <name>bar</name><description><![CDATA[<b>bar</b>]]></description><ExtendedData></ExtendedData>
        <Point><coordinates>0,1</coordinates></Point></Placemark></Document></kml>"
    `);
  });

  it("with style", () => {
    expect(
      toKML(
        {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                foo: "bar",
              },

              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [0, 2],
                    [1, 2],
                    [2, 2],
                    [0, 2],
                  ],

                  [
                    [0, 3],
                    [1, 3],
                    [2, 3],
                    [0, 3],
                  ],
                ],
              },
            },
          ],
        },
        {
          line: {
            color: "ff0000ff",
            width: "2",
          },
          poly: {
            color: "7f00ff00",
          },
        },
        'test'
      )
    ).toMatchInlineSnapshot(`
      "<kml xmlns=\\"http://www.opengis.net/kml/2.2\\"><Document><Style id=\\"test\\"><LineStyle><color>ff0000ff</color><width>2</width></LineStyle><PolyStyle><color>7f00ff00</color></PolyStyle></Style>
      <Placemark><styleUrl>#test</styleUrl>
      <ExtendedData>
        <Data name=\\"foo\\"><value>bar</value></Data></ExtendedData>
        <Polygon>
      <outerBoundaryIs>
        <LinearRing><coordinates>0,2
      1,2
      2,2
      0,2</coordinates></LinearRing></outerBoundaryIs>
      <innerBoundaryIs>
        <LinearRing><coordinates>0,3
      1,3
      2,3
      0,3</coordinates></LinearRing></innerBoundaryIs></Polygon></Placemark></Document></kml>"
    `);
  });
});
