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
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
package org.openremote.model.custom;

import java.util.Optional;

import org.openremote.model.asset.Asset;
import org.openremote.model.asset.AssetDescriptor;
import org.openremote.model.value.AttributeDescriptor;
import org.openremote.model.value.ValueDescriptor;

import jakarta.persistence.Entity;

/**
 * This is an example of a custom {@link Asset} type; this must be registered via an {@link
 * org.openremote.model.AssetModelProvider} and must conform to the following requirements:
 *
 * <ul>
 *   <li>Must have {@link Entity} annotation
 *   <li>Optionally add {@link org.openremote.model.value.ValueDescriptor}s
 *   <li>Optionally add {@link org.openremote.model.value.MetaItemDescriptor}s
 *   <li>Optionally add {@link org.openremote.model.value.AttributeDescriptor}s
 *   <li>Must have a public static final {@link org.openremote.model.asset.AssetDescriptor}
 *   <li>Must have a protected no args constructor (for hydrators i.e. JPA/Jackson)
 *   <li>For a given {@link Asset} type only one {@link org.openremote.model.asset.AssetDescriptor}
 *       can exist
 *   <li>{@link org.openremote.model.value.AttributeDescriptor}s that override a super class
 *       descriptor cannot change the value type; just the formatting etc.
 *   <li>{@link org.openremote.model.value.MetaItemDescriptor}s names must be unique
 *   <li>{@link org.openremote.model.value.ValueDescriptor}s names must be unique
 * </ul>
 */
@Entity
public class CustomAsset extends Asset<CustomAsset> {

  public enum CustomValueType {
    ONE,
    TWO,
    THREE
  }

  public static final ValueDescriptor<CustomValueType> CUSTOM_VALUE_TYPE_VALUE_DESCRIPTOR =
      new ValueDescriptor<>("customValueType", CustomValueType.class);

  public static final AttributeDescriptor<CustomValueType> CUSTOM_VALUE_TYPE_ATTRIBUTE_DESCRIPTOR =
      new AttributeDescriptor<>("customAttribute", CUSTOM_VALUE_TYPE_VALUE_DESCRIPTOR);

  public static final AssetDescriptor<CustomAsset> CUSTOM_ASSET_ASSET_DESCRIPTOR =
      new AssetDescriptor<>("brightness-auto", "00aaaa", CustomAsset.class);

  public Optional<CustomValueType> getCustomAttribute() {
    return getAttributes().getValue(CUSTOM_VALUE_TYPE_ATTRIBUTE_DESCRIPTOR);
  }

  public CustomAsset setCustomAttribute(CustomValueType value) {
    getAttributes().getOrCreate(CUSTOM_VALUE_TYPE_ATTRIBUTE_DESCRIPTOR).setValue(value);
    return this;
  }
}
