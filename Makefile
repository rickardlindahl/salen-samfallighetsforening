dev:
	tmux \
    new-session  'npm run db:connect' \; \
    split-window 'npm run dev' \;
