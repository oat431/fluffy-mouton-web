import { n as api, t as Section } from "./Section-sBf6xsXA.js";
import { Form, UNSAFE_withComponentProps, useLoaderData, useNavigation } from "react-router";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region app/services/ShortLinkService.ts
async function createRandomShortLink(shortLinkRequest) {
	return (await api.post("/short-link/random", shortLinkRequest)).data;
}
async function createCustomShortLink(shortLinkRequest) {
	return (await api.post("/short-link/custom", shortLinkRequest)).data;
}
async function getShortLinks() {
	return (await api.get("/short-link/")).data;
}
//#endregion
//#region app/components/ClickToCopy.tsx
var ClickToCopy = ({ text }) => {
	const [copied, setCopied] = useState(false);
	const handleCopy = () => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		});
	};
	return /* @__PURE__ */ jsx("button", {
		onClick: handleCopy,
		className: "btn btn-sm",
		children: copied ? "Copied!" : "Copy"
	});
};
//#endregion
//#region app/pages/ShortLinkPage.tsx
async function clientLoader() {
	try {
		return { shortLinks: (await getShortLinks()).data };
	} catch (error) {
		console.error("Error fetching short links:", error);
		return { shortLinks: [] };
	}
}
async function clientAction({ request }) {
	const formData = await request.formData();
	const targetUrl = formData.get("targetUrl");
	const isCustom = formData.get("isCustom") === "on";
	const customAlias = formData.get("customAlias");
	try {
		if (isCustom) await createCustomShortLink({
			url: targetUrl,
			custom_name: customAlias
		});
		else await createRandomShortLink({ url: targetUrl });
	} catch (error) {
		console.error("Error creating short link:", error);
	}
	return null;
}
var ShortLinkPage_default = UNSAFE_withComponentProps(function ShortLinkPage() {
	const { shortLinks } = useLoaderData();
	const isSubmitting = useNavigation().state === "submitting";
	const [isCustom, setIsCustom] = useState(false);
	const cvrtTOShrt = (linkType, alias) => {
		return `http://localhost:8004/api/v1/${linkType === "CUSTOM" ? "c" : "r"}/${alias}`;
	};
	return /* @__PURE__ */ jsxs(Section, { children: [/* @__PURE__ */ jsxs(Form, {
		method: "post",
		className: "fieldset",
		children: [
			/* @__PURE__ */ jsx("legend", {
				className: "fieldset-legend",
				children: "Your Very Long URL goes here"
			}),
			/* @__PURE__ */ jsx("input", {
				type: "url",
				name: "targetUrl",
				className: "input w-full",
				placeholder: "Type here",
				required: true,
				disabled: isSubmitting
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "label",
				children: [/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					name: "isCustom",
					className: "toggle",
					checked: isCustom,
					onChange: (e) => setIsCustom(e.target.checked),
					disabled: isSubmitting
				}), /* @__PURE__ */ jsx("span", {
					className: "label-text ml-2",
					children: "Enable Custom Short URL"
				})]
			}),
			isCustom && /* @__PURE__ */ jsx("div", {
				className: "mt-4",
				children: /* @__PURE__ */ jsx("input", {
					type: "text",
					name: "customAlias",
					className: "input w-full",
					placeholder: "Enter Custom Short URL",
					required: true,
					disabled: isSubmitting
				})
			}),
			/* @__PURE__ */ jsx("button", {
				type: "submit",
				className: "btn btn-primary mt-4",
				disabled: isSubmitting,
				children: isSubmitting ? "Processing..." : "Process"
			})
		]
	}), /* @__PURE__ */ jsxs("table", {
		className: "table table-zebra w-full",
		children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
			/* @__PURE__ */ jsx("th", { children: "No." }),
			/* @__PURE__ */ jsx("th", { children: "Short Link" }),
			/* @__PURE__ */ jsx("th", { children: "Original Link" })
		] }) }), /* @__PURE__ */ jsx("tbody", { children: shortLinks.length > 0 && shortLinks.map((link, index) => /* @__PURE__ */ jsxs("tr", { children: [
			/* @__PURE__ */ jsx("td", { children: index + 1 }),
			/* @__PURE__ */ jsxs("td", { children: [
				cvrtTOShrt(link.link_type, link.short_link),
				" ",
				/* @__PURE__ */ jsx(ClickToCopy, { text: cvrtTOShrt(link.link_type, link.short_link) })
			] }),
			/* @__PURE__ */ jsx("td", { children: link.original_link })
		] }, index)) })]
	})] });
});
//#endregion
export { clientAction, clientLoader, ShortLinkPage_default as default };
