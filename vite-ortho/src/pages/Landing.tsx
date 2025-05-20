// src/pages/index.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../components/lib/supabase';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Loader2 } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

interface Test {
  id: number;
  nom: string;
  description: string;
  domaine: string;
  population_cible: string;
  duree: string;
  licence: string;
  statut: string;
  metadata: Record<string, any>;
}

export default function HomePage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [filtered, setFiltered] = useState<Test[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      const { data, error } = await supabase
        .from('tests')
        .select('*')
        .order('nom', { ascending: true });

      if (error) console.error('Erreur fetch:', error);
      else {
        setTests(data || []);
        setFiltered(data || []);
      }
      setLoading(false);
    };

    fetchTests();
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();
    const filteredResults = tests.filter((test) => {
      return (
        test.nom.toLowerCase().includes(query) ||
        test.domaine?.toLowerCase().includes(query) ||
        test.population_cible?.toLowerCase().includes(query) ||
        Object.values(test.metadata || {}).some((val) =>
          String(val).toLowerCase().includes(query)
        )
      );
    });
    setFiltered(filteredResults);
  }, [search, tests]);

  return (
    <MainLayout>
      <div className="mb-8">
        <Label htmlFor="search" className="text-base font-medium text-gray-800">
          🔍 Recherche par mot-clé (nom, domaine, métadonnées...)
        </Label>
        <Input
          id="search"
          placeholder="ex: voix, enfants, 30 items"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-2 max-w-md border-gray-300 shadow-sm"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((test) => (
            <Card key={test.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <h2 className="text-lg font-bold text-blue-700">{test.nom}</h2>
                <p className="text-sm text-gray-500 italic">{test.domaine} — {test.population_cible}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">📜 {test.licence} | ⏱ {test.duree}</p>
                <p className="text-sm text-gray-700 line-clamp-3">{test.description}</p>
                <div className="text-xs text-gray-500 space-y-1">
                  {Object.entries(test.metadata || {}).map(([key, val]) => (
                    <div key={key}>
                      <strong>{key}:</strong> {String(val)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </MainLayout>
  );
}