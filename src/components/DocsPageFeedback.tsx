import { useState } from 'react';
import { CircleAlert, Pencil, ThumbsDown, ThumbsUp } from 'lucide-react';
import {
	openHelpfulFeedbackForm,
	openRaiseIssueForm,
	openSuggestEditForm,
} from './encatch';

export interface DocsPageFeedbackProps {
	pageUrl: string;
	pageTitle: string;
	locale: string;
	helpfulQuestion: string;
	yes: string;
	no: string;
	suggestEdits: string;
	raiseIssue: string;
}

export function DocsPageFeedback({
	pageUrl,
	locale,
	helpfulQuestion,
	yes,
	no,
	suggestEdits,
	raiseIssue,
}: DocsPageFeedbackProps) {
	const [vote, setVote] = useState<'yes' | 'no' | null>(null);

	const handleVote = (next: 'yes' | 'no') => {
		const newVote = vote === next ? null : next;
		setVote(newVote);
		if (newVote) {
			openHelpfulFeedbackForm(pageUrl, newVote, locale);
		}
	};

	return (
		<div className="encatch-feedback">
			<div className="encatch-feedback__row">
				<div className="encatch-feedback__group">
					<p className="encatch-feedback__question">{helpfulQuestion}</p>
					<div className="encatch-feedback__actions">
						<button
							type="button"
							onClick={() => handleVote('yes')}
							aria-pressed={vote === 'yes'}
							className={`encatch-pill${vote === 'yes' ? ' encatch-pill--active' : ''}`}
						>
							<ThumbsUp className="encatch-pill__icon" strokeWidth={1.5} />
							<span>{yes}</span>
						</button>
						<button
							type="button"
							onClick={() => handleVote('no')}
							aria-pressed={vote === 'no'}
							className={`encatch-pill${vote === 'no' ? ' encatch-pill--active' : ''}`}
						>
							<ThumbsDown className="encatch-pill__icon" strokeWidth={1.5} />
							<span>{no}</span>
						</button>
					</div>
				</div>
				<div className="encatch-feedback__actions">
					<button
						type="button"
						onClick={() => openSuggestEditForm(pageUrl, locale)}
						className="encatch-pill"
					>
						<Pencil className="encatch-pill__icon" strokeWidth={1.5} />
						<span>{suggestEdits}</span>
					</button>
					<button
						type="button"
						onClick={() => openRaiseIssueForm(pageUrl, locale)}
						className="encatch-pill"
					>
						<CircleAlert className="encatch-pill__icon" strokeWidth={1.5} />
						<span>{raiseIssue}</span>
					</button>
				</div>
			</div>
		</div>
	);
}
