/*
 * Copyright 2021, OpenRemote Inc.
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
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
package org.openremote.manager.setup.custom;

import org.openremote.manager.setup.ManagerSetup;
import org.openremote.model.Constants;
import org.openremote.model.Container;
import org.openremote.model.asset.impl.ThingAsset;

public class CustomManagerSetup extends ManagerSetup {

  public CustomManagerSetup(Container container) {
    super(container);
  }

  @Override
  public void onStart() throws Exception {
    super.onStart();

    ThingAsset thing = new ThingAsset("Custom Thing").setRealm(Constants.MASTER_REALM);
    thing = assetStorageService.merge(thing);
  }
}
