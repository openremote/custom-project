/*
 * Copyright 2026, OpenRemote Inc.
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
declare module "*.module.css" {
	const classes: CSSModuleClasses;
	export default classes;
}
declare module "*.module.scss" {
	const classes: CSSModuleClasses;
	export default classes;
}
declare module "*.module.sass" {
	const classes: CSSModuleClasses;
	export default classes;
}
declare module "*.module.less" {
	const classes: CSSModuleClasses;
	export default classes;
}
declare module "*.module.styl" {
	const classes: CSSModuleClasses;
	export default classes;
}
declare module "*.module.stylus" {
	const classes: CSSModuleClasses;
	export default classes;
}
declare module "*.module.pcss" {
	const classes: CSSModuleClasses;
	export default classes;
}
declare module "*.module.sss" {
	const classes: CSSModuleClasses;
	export default classes;
}

// CSS
declare module "*.css" {
	/**
	 * @deprecated Use `import style from './style.css?inline'` instead.
	 */
	const css: string;
	export default css;
}
declare module "*.scss" {
	/**
	 * @deprecated Use `import style from './style.scss?inline'` instead.
	 */
	const css: string;
	export default css;
}
declare module "*.sass" {
	/**
	 * @deprecated Use `import style from './style.sass?inline'` instead.
	 */
	const css: string;
	export default css;
}
declare module "*.less" {
	/**
	 * @deprecated Use `import style from './style.less?inline'` instead.
	 */
	const css: string;
	export default css;
}
declare module "*.styl" {
	/**
	 * @deprecated Use `import style from './style.styl?inline'` instead.
	 */
	const css: string;
	export default css;
}
declare module "*.stylus" {
	/**
	 * @deprecated Use `import style from './style.stylus?inline'` instead.
	 */
	const css: string;
	export default css;
}
declare module "*.pcss" {
	/**
	 * @deprecated Use `import style from './style.pcss?inline'` instead.
	 */
	const css: string;
	export default css;
}
declare module "*.sss" {
	/**
	 * @deprecated Use `import style from './style.sss?inline'` instead.
	 */
	const css: string;
	export default css;
}

// images
declare module "*.png" {
	const src: string;
	export default src;
}
declare module "*.jpg" {
	const src: string;
	export default src;
}
declare module "*.jpeg" {
	const src: string;
	export default src;
}
declare module "*.jfif" {
	const src: string;
	export default src;
}
declare module "*.pjpeg" {
	const src: string;
	export default src;
}
declare module "*.pjp" {
	const src: string;
	export default src;
}
declare module "*.gif" {
	const src: string;
	export default src;
}
declare module "*.svg" {
	const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const content: string;

	export { ReactComponent };
	export default content;
}
declare module "*.ico" {
	const src: string;
	export default src;
}
declare module "*.webp" {
	const src: string;
	export default src;
}
declare module "*.avif" {
	const src: string;
	export default src;
}

// media
declare module "*.mp4" {
	const src: string;
	export default src;
}
declare module "*.webm" {
	const src: string;
	export default src;
}
declare module "*.ogg" {
	const src: string;
	export default src;
}
declare module "*.mp3" {
	const src: string;
	export default src;
}
declare module "*.wav" {
	const src: string;
	export default src;
}
declare module "*.flac" {
	const src: string;
	export default src;
}
declare module "*.aac" {
	const src: string;
	export default src;
}

declare module "*.opus" {
	const src: string;
	export default src;
}

// fonts
declare module "*.woff" {
	const src: string;
	export default src;
}
declare module "*.woff2" {
	const src: string;
	export default src;
}
declare module "*.eot" {
	const src: string;
	export default src;
}
declare module "*.ttf" {
	const src: string;
	export default src;
}
declare module "*.otf" {
	const src: string;
	export default src;
}

// other
declare module "*.webmanifest" {
	const src: string;
	export default src;
}
declare module "*.pdf" {
	const src: string;
	export default src;
}
declare module "*.txt" {
	const src: string;
	export default src;
}
