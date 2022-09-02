dev:
	tmux \
    new-session  'npm run dev' \; \
    split-window 'npm run db:connect:shadow' \; \
    split-window 'npm run db:connect' \;
