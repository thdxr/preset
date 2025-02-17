import type { ApplyOptions } from './types'
import { createPresetContext } from './context'
import { importPresetFile } from './import'
import { resolvePreset } from './resolve'
import { debug } from './utils'
import { initializeConfig } from './config'

/**
 * Applies the given preset.
 */
export async function applyPreset(options: ApplyOptions) {
	debug.apply(`Applying preset ${options.resolvable} into ${options.targetDirectory}.`)

	await initializeConfig()

	const resolved = await resolvePreset(options)
	const preset = await importPresetFile(resolved.presetFile)
	const context = await createPresetContext(preset, options, resolved)

	return await preset.apply(context)
}
