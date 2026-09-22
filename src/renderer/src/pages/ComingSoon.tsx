import Card from '../components/ui/Card'

interface ComingSoonProps {
  title: string
}

function ComingSoon({ title }: ComingSoonProps): React.JSX.Element {
  return (
    <Card>
      <h2 className="text-xl font-bold text-text-primary">{title}</h2>
      <p className="mt-2 text-sm text-text-secondary">Em breve.</p>
    </Card>
  )
}

export default ComingSoon
