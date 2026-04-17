git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch .env' HEAD
git push origin --force --all
# Rotate the exposed credential in your secrets manager
kubectl create secret generic api-credentials --from-literal=API_KEY=<new-key> --dry-run=client -o yaml | kubectl apply -f -