// StoryAI App - Main Application

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './data';
import { AppShell } from './components/layout';
import { EntryBrowser } from './views/EntryBrowser';
import { Characters } from './views/Characters';
import { Locations } from './views/Locations';
import { Timeline } from './views/Timeline';
import { Themes } from './views/Themes';
import { Relationships } from './views/Relationships';
import { Search } from './views/Search';
import { Book } from './views/Book';
import { ChapterReaderView } from './views/ChapterReader';
import { Journals } from './views/Journals';
import { Mind } from './views/Mind';

export default function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<EntryBrowser />} />
            <Route path="/entries" element={<EntryBrowser />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/themes" element={<Themes />} />
            <Route path="/relationships" element={<Relationships />} />
            <Route path="/mind" element={<Mind />} />
            <Route path="/book" element={<Book />} />
            <Route path="/book/read/:chapterId" element={<ChapterReaderView />} />
            <Route path="/journals" element={<Journals />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </AppShell>
      </DataProvider>
    </BrowserRouter>
  );
}
