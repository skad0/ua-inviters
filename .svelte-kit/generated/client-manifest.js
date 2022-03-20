export { matchers } from './client-matchers.js';

export const components = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../runtime/components/error.svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/invitee/index.svelte"),
	() => import("../../src/routes/inviter/index.svelte")
];

export const dictionary = {
	"": [[0, 2], [1]],
	"invitee": [[0, 3], [1]],
	"inviter": [[0, 4], [1]]
};