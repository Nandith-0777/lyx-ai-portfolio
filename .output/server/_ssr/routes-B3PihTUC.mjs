import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as Linkedin, c as ArrowUp, i as Mail, l as ArrowUpRight, n as Sparkles, o as Github, r as Menu, s as Award, t as X } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Markdown } from "../_libs/react-markdown+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B3PihTUC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var links = [
	{
		href: "#lyx",
		label: "Ask Lyx"
	},
	{
		href: "#work",
		label: "Work"
	},
	{
		href: "#skills",
		label: "Skills"
	},
	{
		href: "#journey",
		label: "Journey"
	},
	{
		href: "#contact",
		label: "Contact"
	}
];
function NavBar() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	const focusLyx = () => {
		setOpen(false);
		window.dispatchEvent(new CustomEvent("lyx:focus"));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: `glass mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full border border-hairline px-4 py-2.5 transition-all duration-300 sm:px-5 ${scrolled || open ? "shadow-elevated" : "shadow-none"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#top",
					onClick: () => setOpen(false),
					className: "text-[15px] font-semibold tracking-tight",
					children: "Nandith"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "hidden items-center gap-6 text-[13px] text-muted-foreground md:flex",
					children: links.slice(1).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.href,
						className: "transition-colors hover:text-foreground",
						children: l.label
					}) }, l.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: focusLyx,
						className: "inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-[13px] font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] active:scale-95",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), "Ask Lyx"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": open ? "Close menu" : "Open menu",
						"aria-expanded": open,
						onClick: () => setOpen((v) => !v),
						className: "flex size-8 items-center justify-center rounded-full border border-hairline text-foreground md:hidden",
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
					})]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "glass mx-auto mt-2 max-w-3xl rounded-3xl border border-hairline p-2 shadow-elevated md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col",
				children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: l.href,
					onClick: (e) => {
						if (l.href === "#lyx") {
							e.preventDefault();
							focusLyx();
							return;
						}
						setOpen(false);
					},
					className: "block rounded-2xl px-4 py-3 text-[16px] font-medium transition-colors hover:bg-surface",
					children: l.label
				}) }, l.href))
			})
		})]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Reveal({ children, delay = 0, className }) {
	const ref = (0, import_react.useRef)(null);
	const [shown, setShown] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting) {
				setShown(true);
				observer.disconnect();
			}
		}, {
			threshold: .15,
			rootMargin: "0px 0px -8% 0px"
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		style: { transitionDelay: `${delay}ms` },
		className: cn("reveal", shown && "reveal-in", className),
		children
	});
}
var API_BASE = ({
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/"
}["VITE_LYX_API_URL"] ?? "http://127.0.0.1:8000").replace(/\/$/, "");
async function askLyx(message, onChunk, signal) {
	const res = await fetch(`${API_BASE}/chat`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ message }),
		signal: signal ?? null
	});
	if (!res.ok || !res.body) throw new Error(`Lyx responded with ${res.status}`);
	const reader = res.body.getReader();
	const decoder = new TextDecoder();
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		onChunk(decoder.decode(value, { stream: true }));
	}
}
var person = {
	fullName: "Nandith Narayanan",
	role: "AI / ML Engineer in the making",
	location: "Thrissur, Kerala, India",
	email: "nandithn01@gmail.com",
	phone: "+91 6282 907 536",
	linkedin: "https://www.linkedin.com/in/nandith-narayanan/",
	github: "https://github.com/Nandith-0777"
};
var stats = [
	{
		value: "15s",
		label: "Feedback flow, down from 15 minutes"
	},
	{
		value: "10+",
		label: "Technical events organised"
	},
	{
		value: "2024–28",
		label: "B.Tech AI & ML, Vidya Academy"
	}
];
var projects = [
	{
		name: "Feedback Automator",
		tag: "Automation",
		description: "Browser automation for semester feedback forms, with a custom per-faculty rating selector and an interface built for non-technical users.",
		impact: "Cuts a 10–15 minute task to under 15 seconds. Used across the campus.",
		tech: [
			"Python",
			"Selenium",
			"HTML",
			"CSS",
			"JavaScript"
		],
		github: "https://github.com/Nandith-0777/feedback-automator",
		demo: "https://vidyafeedback.netlify.app/"
	},
	{
		name: "OnDotNext",
		tag: "Product",
		description: "Attendance overview for the internally built OnDot college app, with a web version in Next.js showing subject-wise attendance at a glance.",
		impact: "Replaces the slow official portal for a large share of students.",
		tech: [
			"Next.js",
			"Python",
			"JavaScript",
			"CSS"
		],
		github: "https://github.com/Nandith-0777/OnDotNext",
		demo: "https://on-dot-next.vercel.app/"
	},
	{
		name: "AI Job Search Agent",
		tag: "LLM Automation",
		description: "An autonomous agent that skips job marketplaces entirely and goes straight to the source: it scrapes ATS platforms companies actually post on — Greenhouse, Lever, Ashby — sidestepping LinkedIn/Naukri rate limits. Each posting is scored against your resume by Gemini, and top matches get an auto-generated tailored cover note.",
		impact: "Scans 2,000+ postings a day on a schedule and emails the top 5 pre-scored matches with direct apply links — with state tracking so nothing is flagged twice.",
		tech: [
			"Python",
			"Gemini API",
			"Web Scraping",
			"SMTP",
			"Automation"
		]
	},
	{
		name: "PDF ChatBot (RAG)",
		tag: "LLM Engineering",
		description: "Retrieval-Augmented Generation over PDFs: ingestion, chunking, embeddings, ChromaDB vector storage and semantic retrieval through LangChain.",
		impact: "Grounds every answer in retrieved source content to reduce hallucination.",
		tech: [
			"LangChain",
			"ChromaDB",
			"OpenAI API",
			"Python"
		]
	}
];
var awards = [{
	place: "2nd Prize",
	title: "Healthcare Innovation Contest 2026",
	org: "AyuSetu AI × AroNexa — Final Round, Vidya Engineering College",
	description: "Won second place in the final round of a healthcare innovation ideathon, pitching AI-driven solutions for smarter, connected healthcare."
}];
var skillGroups = [
	{
		title: "Languages",
		items: [
			"Python",
			"C++",
			"Java",
			"HTML",
			"CSS"
		]
	},
	{
		title: "ML & AI Libraries",
		items: [
			"NumPy",
			"Pandas",
			"Keras",
			"PyTorch",
			"Matplotlib",
			"OpenCV"
		]
	},
	{
		title: "LLM Engineering",
		items: [
			"LangChain",
			"ChromaDB",
			"FAISS",
			"RAG Pipelines",
			"Transformers"
		]
	},
	{
		title: "Tools",
		items: [
			"Git",
			"GitHub",
			"VS Code"
		]
	},
	{
		title: "Concepts",
		items: [
			"Computer Vision",
			"Large Language Models",
			"UI/UX Design",
			"Bot Automation"
		]
	},
	{
		title: "Languages spoken",
		items: [
			"English",
			"Hindi",
			"Malayalam"
		]
	}
];
var timeline = [
	{
		period: "2024 – Present",
		title: "Learning Coordinator",
		org: "TinkerHub Campus Chapter, Vidya Academy",
		points: [
			"Designed and organised technical courses and workshops.",
			"Organised 10+ events and pre-hackathon bootcamps on React, JavaScript and Node.js.",
			"Coordinated multiple college-level hackathons.",
			"Curated structured learning paths for beginner and intermediate students."
		]
	},
	{
		period: "2024 – 2028",
		title: "B.Tech, Artificial Intelligence & Machine Learning",
		org: "Vidya Academy of Science and Technology, Thrissur",
		points: ["Coursework: Machine Learning, Computer Vision, Data Structures, OOP, Python, Linear Algebra."]
	},
	{
		period: "Certifications",
		title: "DeepLearning.AI",
		org: "Andrew Ng",
		points: ["Machine Learning and Deep Learning Specialization.", "AI For Everyone."]
	}
];
var suggestedQuestions = [
	"What are Nandith's strongest technical skills?",
	"How does the AI Job Search Agent work?",
	"Tell me about the Healthcare Innovation Contest win.",
	"Is he available for internships?"
];
function LyxChat() {
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [input, setInput] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const scrollRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const cardRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, loading]);
	(0, import_react.useEffect)(() => {
		const onFocus = () => {
			cardRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
			window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 500);
		};
		window.addEventListener("lyx:focus", onFocus);
		return () => window.removeEventListener("lyx:focus", onFocus);
	}, []);
	const send = async (raw) => {
		const text = raw.trim();
		if (!text || loading) return;
		setInput("");
		setMessages((m) => [
			...m,
			{
				role: "user",
				content: text
			},
			{
				role: "assistant",
				content: ""
			}
		]);
		setLoading(true);
		try {
			await askLyx(text, (chunk) => {
				setMessages((m) => {
					const next = [...m];
					const last = next[next.length - 1];
					if (!last) return m;
					next[next.length - 1] = {
						role: "assistant",
						content: last.content + chunk
					};
					return next;
				});
			});
		} catch {
			setMessages((m) => [...m.slice(0, -1), {
				role: "assistant",
				content: "I couldn't reach the Lyx service right now. Make sure the backend is running and reachable."
			}]);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		ref: cardRef,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] gradient-lyx blur-2xl",
			style: { animation: "lyx-halo 6s ease-in-out infinite" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-[1.75rem] border border-hairline bg-card shadow-glow sm:rounded-4xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b border-hairline bg-surface/40 px-4 py-3.5 sm:px-6 sm:py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "absolute -inset-1 rounded-full bg-primary/25",
								style: { animation: "lyx-halo 6s ease-in-out infinite" }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "relative size-4" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[15px] font-semibold tracking-tight",
								children: "Lyx"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[12.5px] text-muted-foreground",
								children: "Nandith's AI assistant"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-auto inline-flex items-center gap-1.5 rounded-full border border-hairline bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-primary" }), "Online"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: scrollRef,
					className: "h-[38vh] min-h-[260px] overflow-y-auto px-4 py-6 sm:h-[360px] sm:px-6",
					children: messages.length === 0 && !loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full flex-col items-center justify-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gradient-lyx flex size-12 items-center justify-center rounded-2xl border border-hairline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5 text-primary" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "headline mt-4 text-[19px] sm:text-[21px]",
								children: "Ask me anything."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-[34ch] text-[14.5px] leading-relaxed text-muted-foreground sm:text-[15px]",
								children: "Work, skills, projects or experience — every answer comes straight from Nandith's verified portfolio."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4 sm:space-y-5",
						children: messages.map((m, i) => {
							const showTyping = m.role === "assistant" && i === messages.length - 1 && loading && m.content.length === 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("flex", m.role === "user" ? "justify-end" : "justify-start"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("max-w-[88%] rounded-3xl px-4 py-3 text-[15px] leading-relaxed sm:max-w-[85%]", m.role === "user" ? "bg-primary text-primary-foreground" : "bg-surface text-surface-foreground"),
									children: m.role === "assistant" ? showTyping ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-1.5 py-1",
										children: [
											0,
											1,
											2
										].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "size-1.5 rounded-full bg-muted-foreground",
											style: {
												animation: "lyx-pulse 1.2s ease-in-out infinite",
												animationDelay: `${i * .15}s`
											}
										}, i))
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-3 [&_a]:text-primary [&_a]:underline [&_li]:ml-4 [&_li]:list-disc [&_strong]:font-semibold [&_ul]:space-y-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { children: m.content })
									}) : m.content
								})
							}, i);
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-hairline px-4 py-3.5 sm:px-6 sm:py-4",
					children: [messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0",
						children: suggestedQuestions.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => void send(q),
							className: "shrink-0 rounded-full border border-hairline px-3.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-primary hover:text-foreground",
							children: q
						}, q))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							send(input);
						},
						className: "flex items-center gap-2 rounded-full border border-hairline bg-background px-4 py-2 focus-within:border-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: inputRef,
							value: input,
							onChange: (e) => setInput(e.target.value),
							placeholder: "Ask Lyx about Nandith…",
							"aria-label": "Ask Lyx a question",
							className: "min-w-0 flex-1 bg-transparent py-1.5 text-[16px] outline-none placeholder:text-muted-foreground sm:text-[15px]"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !input.trim() || loading,
							"aria-label": "Send message",
							className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-30 sm:size-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
						})]
					})]
				})
			]
		})]
	});
}
function Section({ id, eyebrow, title, children, tinted = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		className: tinted ? "bg-surface" : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-5 py-20 sm:py-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: eyebrow
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "headline mt-3 max-w-3xl text-[clamp(1.9rem,7vw,3.25rem)]",
				children: title
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 sm:mt-14",
				children
			})]
		})
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "top",
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "lyx",
					className: "relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "pointer-events-none absolute inset-x-0 -top-40 h-[640px] bg-[radial-gradient(55%_55%_at_50%_35%,var(--accent),transparent_70%)] opacity-80"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "grid-fade pointer-events-none absolute inset-x-0 top-0 h-[720px]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "aurora pointer-events-none absolute -left-24 top-24 size-[420px] rounded-full bg-primary/25"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "aurora pointer-events-none absolute -right-24 top-56 size-[380px] rounded-full",
							style: {
								background: "color-mix(in oklab, var(--spark) 30%, transparent)",
								animationDelay: "3s"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mx-auto max-w-5xl px-5 pt-28 pb-16 sm:pt-40 sm:pb-24",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-2 rounded-full border border-hairline bg-card/70 px-3.5 py-1.5 text-[12.5px] font-medium text-muted-foreground shadow-elevated backdrop-blur",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "relative flex size-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-1.5 rounded-full bg-primary" })]
												}),
												person.location,
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-px bg-hairline" }),
												"Open to AI/ML internships"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "headline mt-6 text-[clamp(2.4rem,10vw,5.5rem)]",
											children: "Nandith Narayanan."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "headline text-gradient mt-1.5 text-[clamp(1.5rem,6.5vw,3.25rem)]",
											children: "AI/ML Engineer in the making."
										})
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
									delay: 200,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto mt-10 max-w-3xl sm:mt-14",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LyxChat, {})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
									delay: 280,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 flex flex-wrap items-center justify-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "#work",
											className: "group inline-flex items-center gap-1 rounded-full border border-hairline bg-card px-5 py-3 text-[15px] font-medium transition-colors hover:border-primary sm:px-6",
											children: ["See the work", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 transition-transform group-hover:translate-x-0.5" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "#contact",
											className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-[15px] font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:px-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }), " Get in touch"]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
									delay: 340,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
										className: "mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-8 text-center sm:mt-20 sm:grid-cols-3 sm:gap-10",
										children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "headline text-3xl sm:text-4xl",
											children: s.value
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "mt-2 text-[13px] leading-snug text-muted-foreground",
											children: s.label
										})] }, s.label))
									})
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					id: "work",
					eyebrow: "Selected work",
					title: "Projects that people actually use.",
					tinted: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 md:grid-cols-2 md:gap-6",
						children: projects.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i % 2 * 90,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "flex h-full flex-col rounded-3xl border border-hairline bg-card p-6 shadow-elevated transition-transform duration-500 hover:-translate-y-1 sm:rounded-4xl sm:p-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "eyebrow",
										children: p.tag
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "headline mt-2 text-2xl",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-[15px] leading-relaxed text-muted-foreground",
										children: p.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-[15px] leading-relaxed",
										children: p.impact
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-6 flex flex-wrap gap-2",
										children: p.tech.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
											className: "rounded-full bg-surface px-3 py-1 text-xs text-muted-foreground",
											children: t
										}, t))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 flex flex-wrap gap-5 text-[14px] font-medium text-primary",
										children: [p.github && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											className: "inline-flex items-center gap-1 hover:underline",
											href: p.github,
											target: "_blank",
											rel: "noreferrer",
											children: ["Repository ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
										}), p.demo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											className: "inline-flex items-center gap-1 hover:underline",
											href: p.demo,
											target: "_blank",
											rel: "noreferrer",
											children: ["Live ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
										})]
									})
								]
							})
						}, p.name))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					id: "recognition",
					eyebrow: "Recognition",
					title: "Award-winning ideas.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 md:grid-cols-2 md:gap-6",
						children: awards.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i % 2 * 90,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "relative h-full overflow-hidden rounded-3xl border border-hairline bg-card p-6 shadow-elevated sm:rounded-4xl sm:p-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"aria-hidden": true,
									className: "pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/15 blur-3xl"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-primary",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-3.5" }),
												" ",
												a.place
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "headline mt-4 text-2xl",
											children: a.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1.5 text-[13.5px] font-medium text-muted-foreground",
											children: a.org
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-[15px] leading-relaxed text-muted-foreground",
											children: a.description
										})
									]
								})]
							})
						}, a.title))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					id: "skills",
					eyebrow: "Toolkit",
					title: "From tensors to interfaces.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-x-10 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3",
						children: skillGroups.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i % 3 * 80,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-hairline pt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-[15px] font-semibold tracking-tight",
									children: g.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 space-y-2 text-[15px] text-muted-foreground",
									children: g.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
								})]
							})
						}, g.title))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					id: "journey",
					eyebrow: "Journey",
					title: "Learning, shipping, leading.",
					tinted: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-10 sm:space-y-12",
						children: timeline.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i * 80,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 border-t border-hairline pt-6 sm:pt-8 md:grid-cols-[200px_1fr] md:gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[13px] text-muted-foreground",
									children: t.period
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "headline text-xl",
										children: t.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[15px] text-muted-foreground",
										children: t.org
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-4 space-y-2 text-[15px] leading-relaxed text-muted-foreground",
										children: t.points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: p }, p))
									})
								] })]
							})
						}, t.title))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "contact",
					className: "bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-5xl px-5 py-20 text-center sm:py-32",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Currently"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "headline mt-3 text-[clamp(1.9rem,7vw,3.5rem)]",
								children: "Looking for an AI/ML internship."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `mailto:${person.email}`,
										className: "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-medium text-primary-foreground transition-opacity hover:opacity-90",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }),
											" ",
											person.email
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: person.github,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex items-center justify-center gap-2 rounded-full border border-hairline bg-card px-6 py-3 text-[15px] font-medium transition-colors hover:border-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-4" }), " GitHub"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: person.linkedin,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex items-center justify-center gap-2 rounded-full border border-hairline bg-card px-6 py-3 text-[15px] font-medium transition-colors hover:border-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "size-4" }), " LinkedIn"]
									})
								]
							})
						] })
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-hairline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-[12px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Nandith Narayanan. ",
						person.location,
						"."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Answers by Lyx are generated from verified portfolio data." })]
				})
			})
		]
	});
}
//#endregion
export { Index as component };
