my $n = 0;

while (<>) {
  if (/^(\d+)\[/) {
      $n = $1;
  }
  if (/^Error:/) {
      $n++;
      print "$n\n";
  }
}
