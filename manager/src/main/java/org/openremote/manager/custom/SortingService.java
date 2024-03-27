/*
 * Copyright 2021, OpenRemote Inc.
 *
 * See the CONTRIBUTORS.txt file in the distribution for a
 * full listing of individual contributors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package org.openremote.manager.custom;

import org.openremote.container.message.MessageBrokerService;
import org.openremote.manager.notification.NotificationResourceImpl;
import org.openremote.manager.security.ManagerIdentityService;
import org.openremote.manager.web.ManagerWebService;
import org.openremote.model.Container;
import org.openremote.model.ContainerService;
import org.openremote.manager.asset.AssetStorageService;
import org.openremote.model.asset.Asset;
import org.openremote.model.query.AssetQuery;

import java.util.List;
import java.util.stream.Collectors;

public class SortingService implements ContainerService {

    protected AssetStorageService assetStorageService;
    public void setAssetStorageService(AssetStorageService assetStorageService) {
        this.assetStorageService = assetStorageService;
    }
    @Override
    public void init(Container container) throws Exception {
        this.assetStorageService = container.getService(AssetStorageService.class);

        container.getServices(AssetStorageService.class);
    }

    @Override
    public void start(Container container) throws Exception {

    }

    @Override
    public void stop(Container container) throws Exception {

    }

    /**
     * Fetches assets and sorts them by name in ascending order.
     *
     * @return a sorted list of assets.
     */
    public List<Asset<?>> getSortedAssetsByName() {
        AssetQuery query = new AssetQuery();

        List<Asset<?>> assets = assetStorageService.findAll(query);

        return assets.stream()
                .sorted((a1, a2) -> a1.getName().compareToIgnoreCase(a2.getName()))
                .collect(Collectors.toList());
    }
}