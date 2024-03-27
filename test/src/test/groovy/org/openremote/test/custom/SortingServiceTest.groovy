package org.openremote.test.custom

import org.openremote.manager.asset.AssetStorageService
import org.openremote.manager.custom.SortingService
import org.openremote.model.asset.Asset
import org.openremote.model.query.AssetQuery
import org.openremote.test.ManagerContainerTrait
import spock.lang.Specification
import spock.lang.Unroll

class SortingServiceTest extends Specification implements ManagerContainerTrait {

    def "SortingService should sort assets by name"() {
        setup:
        // Create mocks for Asset instances
        Asset assetA = Mock(Asset)
        Asset assetB = Mock(Asset)
        Asset assetC = Mock(Asset)

        // Setup mock behavior to return specific names
        assetA.getName() >> "Asset A"
        assetB.getName() >> "Asset C"
        assetC.getName() >> "Asset B"

        // Mock the AssetStorageService to return the assets in an unsorted order
        AssetStorageService assetStorageService = Mock(AssetStorageService)
        assetStorageService.findAll(_ as AssetQuery) >> [assetB, assetC, assetA]


        // Initialize SortingService with the mocked AssetStorageService
        SortingService sortingService = new SortingService()
        sortingService.setAssetStorageService(assetStorageService)


        when:
        // Call the method under test
        List<Asset<?>> sortedAssets = sortingService.getSortedAssetsByName()

        then:
        // Verify the assets are sorted by name
        assert sortedAssets*.getName() == ["Asset A", "Asset B", "Asset C"]
        println "Assets successfully sorted by name: ${sortedAssets*.getName()}"
    }
}
